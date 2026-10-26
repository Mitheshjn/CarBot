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
          request.response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          request.response.headers.add('Access-Control-Allow-Headers', '*');
          request.response.statusCode = HttpStatus.ok;
          await request.response.close();
          return;
        }

        String path = request.uri.path;
        if (path.startsWith('/')) path = path.substring(1);
        if (path.startsWith('flutter_assets/')) {
          path = path.substring('flutter_assets/'.length);
        }
        if (path.isEmpty) path = 'assets/web/index.html';

        try {
          final ByteData data = await rootBundle.load(path);
          final lower = path.toLowerCase();

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
          } else if (lower.endsWith('.png')) {
            request.response.headers.contentType = ContentType('image', 'png');
          } else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
            request.response.headers.contentType = ContentType('image', 'jpeg');
          } else if (lower.endsWith('.svg')) {
            request.response.headers.contentType = ContentType('image', 'svg+xml');
          } else if (lower.endsWith('.bin') ||
              lower.endsWith('.binarypb') ||
              lower.endsWith('.tflite') ||
              lower.endsWith('.data')) {
            request.response.headers.contentType = ContentType('application', 'octet-stream');
          } else {
            request.response.headers.contentType = ContentType('application', 'octet-stream');
          }

          request.response.headers.add('Access-Control-Allow-Origin', '*');
          request.response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          request.response.headers.add('Access-Control-Allow-Headers', '*');
          request.response.headers.add('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          request.response.headers.add('Pragma', 'no-cache');
          request.response.headers.add('Expires', '0');

          request.response.add(data.buffer.asUint8List());
        } catch (e) {
          debugPrint('Local server 404 for asset: $path ($e)');
          request.response.statusCode = HttpStatus.notFound;
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
              return PermissionResponse(
                resources: request.resources,
                action: PermissionResponseAction.GRANT,
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