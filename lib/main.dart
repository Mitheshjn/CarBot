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
  final Map<String, Uint8List> _assetCache = {};

  static const String _assetHost = 'appassets.androidplatform.net';
  static const String _initialUrl = 'https://$_assetHost/assets/flutter_assets/assets/web/index.html';

  @override
  void initState() {
    super.initState();
    _requestAppPermissions();
  }

  Future<void> _requestAppPermissions() async {
    await Permission.camera.request();
    await Permission.microphone.request();
  }

  String _getMimeType(String path) {
    final lower = path.toLowerCase();
    if (lower.endsWith('.html')) return 'text/html';
    if (lower.endsWith('.js')) return 'application/javascript';
    if (lower.endsWith('.css')) return 'text/css';
    if (lower.endsWith('.json')) return 'application/json';
    if (lower.endsWith('.wasm')) return 'application/wasm';
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    if (lower.endsWith('.svg')) return 'image/svg+xml';
    if (lower.endsWith('.bin') ||
        lower.endsWith('.binarypb') ||
        lower.endsWith('.tflite') ||
        lower.endsWith('.data')) {
      return 'application/octet-stream';
    }
    return 'application/octet-stream';
  }

  Future<WebResourceResponse?> _handleAssetInterception(WebResourceRequest request) async {
    final url = request.url;
    if (url.host != _assetHost) {
      // Allow external network traffic (e.g. ESP32-CAM stream, car control commands) to proceed naturally
      return null;
    }

    if (request.method == 'OPTIONS') {
      return WebResourceResponse(
        contentType: 'text/plain',
        statusCode: 200,
        reasonPhrase: 'OK',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
        data: Uint8List(0),
      );
    }

    String path = url.path;
    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    if (path.startsWith('assets/flutter_assets/')) {
      path = path.substring('assets/flutter_assets/'.length);
    } else if (path.startsWith('flutter_assets/')) {
      path = path.substring('flutter_assets/'.length);
    }

    if (path.isEmpty) {
      path = 'assets/web/index.html';
    }

    final cached = _assetCache[path];
    Uint8List bytes;
    if (cached != null) {
      bytes = cached;
    } else {
      try {
        final ByteData data = await rootBundle.load(path);
        bytes = data.buffer.asUint8List();
        _assetCache[path] = bytes;
      } catch (e) {
        debugPrint('WebView asset loader 404: $path ($e)');
        return WebResourceResponse(
          contentType: 'text/plain',
          statusCode: 404,
          reasonPhrase: 'Not Found',
          data: Uint8List.fromList('Asset not found: $path'.codeUnits),
        );
      }
    }

    final mimeType = _getMimeType(path);
    final isText = mimeType.startsWith('text/') ||
        mimeType == 'application/javascript' ||
        mimeType == 'application/json';

    return WebResourceResponse(
      contentType: mimeType,
      contentEncoding: isText ? 'utf-8' : null,
      statusCode: 200,
      reasonPhrase: 'OK',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=86400',
      },
      data: bytes,
    );
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
  Widget build(BuildContext context) {
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
            initialUrlRequest: URLRequest(url: WebUri(_initialUrl)),
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
              useShouldInterceptRequest: true,
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
            shouldInterceptRequest: (controller, request) async {
              return await _handleAssetInterception(request);
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