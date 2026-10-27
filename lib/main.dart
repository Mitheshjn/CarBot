import 'dart:collection';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:file_picker/file_picker.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
  runApp(const SnapRacerApp());
}

class SnapRacerApp extends StatelessWidget {
  const SnapRacerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CAR BOT',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0d0d0d),
      ),
      home: const ControllerWebViewScreen(),
    );
  }
}

class ControllerWebViewScreen extends StatefulWidget {
  const ControllerWebViewScreen({super.key});

  @override
  State<ControllerWebViewScreen> createState() => _ControllerWebViewScreenState();
}

class _ControllerWebViewScreenState extends State<ControllerWebViewScreen> {
  InAppWebViewController? _webViewController;
  HttpServer? _localServer;
  int _serverPort = 8080;
  bool _serverReady = false;

  @override
  void initState() {
    super.initState();
    _requestAppPermissions();
    _startLocalServer();
  }

  Future<void> _requestAppPermissions() async {
    await Permission.camera.request();
    await Permission.microphone.request();
  }

  Future<void> _startLocalServer() async {
    try {
      try {
        _localServer = await HttpServer.bind(InternetAddress.loopbackIPv4, 8080);
      } catch (_) {
        _localServer = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
      }
      _serverPort = _localServer!.port;
      debugPrint('Local asset server active at http://127.0.0.1:$_serverPort');

      _localServer!.listen((HttpRequest request) async {
        if (request.method == 'OPTIONS') {
          request.response.headers.add('Access-Control-Allow-Origin', '*');
          request.response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
          request.response.headers.add('Access-Control-Allow-Headers', '*');
          request.response.headers.add('Access-Control-Max-Age', '86400');
          request.response.statusCode = HttpStatus.ok;
          await request.response.close();
          return;
        }

        String rawPath = request.uri.path;
        String path = Uri.decodeComponent(rawPath).trim();
        while (path.startsWith('/')) {
          path = path.substring(1);
        }
        if (path.contains('?')) {
          path = path.split('?').first;
        }
        if (path.contains('#')) {
          path = path.split('#').first;
        }
        if (path.startsWith('flutter_assets/')) {
          path = path.substring('flutter_assets/'.length);
        }

        final List<String> candidates = <String>[];

        if (path.isEmpty || path == 'assets/web' || path == 'assets/web/') {
          candidates.add('assets/web/index.html');
        } else if (path == 'camera' ||
            path == 'camera/' ||
            path == 'assets/camera' ||
            path == 'assets/camera/' ||
            path == 'assets/web/camera' ||
            path == 'assets/web/camera/') {
          candidates.add('assets/web/camera/index.html');
        } else {
          String normalized = path;
          if (normalized.endsWith('/')) {
            normalized = '${normalized}index.html';
          }

          if (normalized.startsWith('assets/camera/')) {
            final sub = normalized.substring('assets/camera/'.length);
            candidates.add('assets/web/camera/$sub');
            candidates.add(normalized);
          } else if (normalized.startsWith('camera/')) {
            final sub = normalized.substring('camera/'.length);
            candidates.add('assets/web/camera/$sub');
            candidates.add('assets/camera/$sub');
            candidates.add('assets/web/$normalized');
          } else if (normalized.startsWith('assets/web/camera/')) {
            candidates.add(normalized);
          } else if (normalized.startsWith('assets/web/')) {
            candidates.add(normalized);
            final sub = normalized.substring('assets/web/'.length);
            if (!sub.startsWith('camera/')) {
              candidates.add('assets/web/camera/$sub');
            }
          } else if (normalized.startsWith('assets/')) {
            candidates.add(normalized);
            final sub = normalized.substring('assets/'.length);
            candidates.add('assets/web/$sub');
            candidates.add('assets/web/camera/$sub');
          } else {
            // Non-prefixed files (e.g. scripts, models, shards, styles)
            candidates.add('assets/web/$normalized');
            candidates.add('assets/web/camera/$normalized');
            candidates.add('assets/$normalized');
            candidates.add(normalized);
          }
        }

        ByteData? data;
        String resolvedPath = '';

        for (final candidate in candidates) {
          try {
            data = await rootBundle.load(candidate);
            resolvedPath = candidate;
            break;
          } catch (_) {}
        }

        // Local file fallback for development / desktop environments
        if (data == null) {
          for (final candidate in candidates) {
            try {
              final file = File(candidate);
              if (await file.exists()) {
                final bytes = await file.readAsBytes();
                data = ByteData.view(bytes.buffer);
                resolvedPath = candidate;
                break;
              }
            } catch (_) {}
          }
        }

        if (data != null) {
          final lower = resolvedPath.toLowerCase();

          if (lower.endsWith('.html')) {
            request.response.headers.contentType = ContentType('text', 'html', charset: 'utf-8');
          } else if (lower.endsWith('.js')) {
            request.response.headers.contentType = ContentType('application', 'javascript', charset: 'utf-8');
          } else if (lower.endsWith('.css')) {
            request.response.headers.contentType = ContentType('text', 'css', charset: 'utf-8');
          } else if (lower.endsWith('.json')) {
            request.response.headers.contentType = ContentType('application', 'json', charset: 'utf-8');
          } else if (lower.endsWith('.wasm')) {
            request.response.headers.contentType = ContentType('application', 'wasm');
          } else if (lower.endsWith('.xml')) {
            request.response.headers.contentType = ContentType('text', 'xml', charset: 'utf-8');
          } else if (lower.endsWith('.png')) {
            request.response.headers.contentType = ContentType('image', 'png');
          } else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
            request.response.headers.contentType = ContentType('image', 'jpeg');
          } else if (lower.endsWith('.svg')) {
            request.response.headers.contentType = ContentType('image', 'svg+xml');
          } else if (lower.endsWith('.mp3')) {
            request.response.headers.contentType = ContentType('audio', 'mpeg');
          } else if (lower.endsWith('.wav')) {
            request.response.headers.contentType = ContentType('audio', 'wav');
          } else if (lower.endsWith('.bin') ||
              lower.endsWith('.binarypb') ||
              lower.endsWith('.tflite') ||
              lower.endsWith('.data')) {
            request.response.headers.contentType = ContentType('application', 'octet-stream');
          } else {
            request.response.headers.contentType = ContentType('application', 'octet-stream');
          }

          request.response.headers.add('Access-Control-Allow-Origin', '*');
          request.response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
          request.response.headers.add('Access-Control-Allow-Headers', '*');
          request.response.headers.add('Cross-Origin-Resource-Policy', 'cross-origin');
          request.response.headers.add('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          request.response.headers.add('Pragma', 'no-cache');
          request.response.headers.add('Expires', '0');

          if (request.method != 'HEAD') {
            request.response.add(data.buffer.asUint8List());
          }
        } else {
          debugPrint('Local server 404 for asset: $path (tried: ${candidates.join(', ')})');
          request.response.statusCode = HttpStatus.notFound;
          request.response.headers.contentType = ContentType('text', 'plain', charset: 'utf-8');
          request.response.write('Asset not found: $path');
        }
        await request.response.close();
      });

      if (mounted) {
        setState(() {
          _serverReady = true;
        });
      }
    } catch (e) {
      debugPrint('Failed to start local server: $e');
    }
  }

  void _registerJsHandlers(InAppWebViewController controller) {
    // 1. App Reload
    controller.addJavaScriptHandler(
      handlerName: 'FlutterBridge',
      callback: (args) {
        final msg = args.isNotEmpty ? args[0].toString() : '';
        if (msg == 'reload') {
          controller.reload();
        }
      },
    );

    // 2. Orientation Lock
    controller.addJavaScriptHandler(
      handlerName: 'FlutterOrientation',
      callback: (args) {
        final msg = args.isNotEmpty ? args[0].toString() : '';
        if (msg == 'lock_landscape') {
          SystemChrome.setPreferredOrientations([
            DeviceOrientation.landscapeLeft,
            DeviceOrientation.landscapeRight,
          ]);
        } else if (msg == 'lock_portrait') {
          SystemChrome.setPreferredOrientations([
            DeviceOrientation.portraitUp,
            DeviceOrientation.portraitDown,
          ]);
        } else if (msg == 'unlock') {
          SystemChrome.setPreferredOrientations([
            DeviceOrientation.portraitUp,
            DeviceOrientation.portraitDown,
            DeviceOrientation.landscapeLeft,
            DeviceOrientation.landscapeRight,
          ]);
        }
      },
    );

    // 3. Native File Picker for XML Upload
    controller.addJavaScriptHandler(
      handlerName: 'FlutterFilePicker',
      callback: (args) async {
        try {
          FilePickerResult? result = await FilePicker.platform.pickFiles(
            type: FileType.custom,
            allowedExtensions: ['xml'],
          );

          if (result != null && result.files.single.path != null) {
            File file = File(result.files.single.path!);
            String content = await file.readAsString();
            String escaped = content
                .replaceAll(r'\', r'\\')
                .replaceAll("'", r"\'")
                .replaceAll('\n', r'\n')
                .replaceAll('\r', '');
            await controller.evaluateJavascript(source: "loadXmlText('$escaped');");
          }
        } catch (e) {
          debugPrint('File pick error: $e');
        }
      },
    );

    // 4. Native File Saver for XML Download
    controller.addJavaScriptHandler(
      handlerName: 'FlutterFileSaver',
      callback: (args) async {
        try {
          final text = args.isNotEmpty ? args[0].toString() : '';
          final downloadDir = Directory('/storage/emulated/0/Download');
          final dirPath = downloadDir.existsSync()
              ? downloadDir.path
              : (await getApplicationDocumentsDirectory()).path;

          final timestamp = DateTime.now().millisecondsSinceEpoch;
          final file = File('$dirPath/rover_blocks_$timestamp.xml');
          await file.writeAsString(text);

          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Saved to Downloads: ${file.path.split('/').last}'),
                backgroundColor: const Color(0xFF238636),
              ),
            );
          }
        } catch (e) {
          debugPrint('Save file error: $e');
        }
      },
    );
  }

  @override
  void dispose() {
    _localServer?.close(force: true);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_serverReady) {
      return const Scaffold(
        backgroundColor: Color(0xFF0d0d0d),
        body: Center(
          child: CircularProgressIndicator(color: Color(0xFF007aff)),
        ),
      );
    }

    final cacheBuster = DateTime.now().millisecondsSinceEpoch;
    final initialUri = 'http://127.0.0.1:$_serverPort/assets/web/index.html?v=$cacheBuster';

    return Scaffold(
      body: PopScope(
        canPop: false,
        onPopInvokedWithResult: (didPop, result) async {
          if (didPop) return;
          final controller = _webViewController;
          if (controller != null && await controller.canGoBack()) {
            await controller.goBack();
          } else if (context.mounted) {
            SystemNavigator.pop();
          }
        },
        child: SafeArea(
          child: InAppWebView(
            initialUrlRequest: URLRequest(url: WebUri(initialUri)),
            initialSettings: InAppWebViewSettings(
              mixedContentMode: MixedContentMode.MIXED_CONTENT_ALWAYS_ALLOW,
              allowsInlineMediaPlayback: true,
              mediaPlaybackRequiresUserGesture: false,
              javaScriptEnabled: true,
              domStorageEnabled: true,
              databaseEnabled: true,
              allowFileAccess: true,
              allowContentAccess: true,
              allowFileAccessFromFileURLs: true,
              allowUniversalAccessFromFileURLs: true,
              cacheEnabled: true,
            ),
            initialUserScripts: UnmodifiableListView<UserScript>([
              UserScript(
                source: """
                  window.FlutterBridge = {
                    postMessage: function(msg) {
                      window.flutter_inappwebview.callHandler('FlutterBridge', msg);
                    }
                  };
                  window.FlutterOrientation = {
                    postMessage: function(msg) {
                      window.flutter_inappwebview.callHandler('FlutterOrientation', msg);
                    }
                  };
                  window.FlutterFileSaver = {
                    postMessage: function(msg) {
                      window.flutter_inappwebview.callHandler('FlutterFileSaver', msg);
                    }
                  };
                  window.FlutterFilePicker = {
                    postMessage: function(msg) {
                      window.flutter_inappwebview.callHandler('FlutterFilePicker', msg);
                    }
                  };
                """,
                injectionTime: UserScriptInjectionTime.AT_DOCUMENT_START,
              ),
            ]),
            onWebViewCreated: (controller) {
              _webViewController = controller;
              _registerJsHandlers(controller);
            },
            onPermissionRequest: (controller, request) async {
              final status = await Permission.camera.request();
              if (status.isGranted || status.isLimited) {
                return PermissionResponse(
                  resources: request.resources,
                  action: PermissionResponseAction.GRANT,
                );
              }
              return PermissionResponse(
                resources: request.resources,
                action: PermissionResponseAction.DENY,
              );
            },
            onConsoleMessage: (controller, consoleMessage) {
              debugPrint('[WebView] ${consoleMessage.messageLevel}: ${consoleMessage.message}');
            },
          ),
        ),
      ),
    );
  }
}