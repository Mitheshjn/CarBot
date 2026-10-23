import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
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
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF0d0d0d))
      ..setNavigationDelegate(
        NavigationDelegate(
          onWebResourceError: (WebResourceError error) {
            debugPrint('Web resource error: ${error.description}');
          },
        ),
      )
      // 1. App Reload
      ..addJavaScriptChannel(
        'FlutterBridge',
        onMessageReceived: (JavaScriptMessage message) {
          if (message.message == 'reload') {
            _controller.reload();
          }
        },
      )
      // 2. Orientation Lock
      ..addJavaScriptChannel(
        'FlutterOrientation',
        onMessageReceived: (JavaScriptMessage message) {
          if (message.message == 'lock_landscape') {
            SystemChrome.setPreferredOrientations([
              DeviceOrientation.landscapeLeft,
              DeviceOrientation.landscapeRight,
            ]);
          } else if (message.message == 'lock_portrait') {
            SystemChrome.setPreferredOrientations([
              DeviceOrientation.portraitUp,
              DeviceOrientation.portraitDown,
            ]);
          } else if (message.message == 'unlock') {
            SystemChrome.setPreferredOrientations([
              DeviceOrientation.portraitUp,
              DeviceOrientation.portraitDown,
              DeviceOrientation.landscapeLeft,
              DeviceOrientation.landscapeRight,
            ]);
          }
        },
      )
      // 3. Native File Picker for XML Upload
      ..addJavaScriptChannel(
        'FlutterFilePicker',
        onMessageReceived: (JavaScriptMessage message) async {
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
              _controller.runJavaScript("loadXmlText('$escaped');");
            }
          } catch (e) {
            debugPrint('File pick error: $e');
          }
        },
      )
      // 4. Native File Saver for XML Download
      ..addJavaScriptChannel(
        'FlutterFileSaver',
        onMessageReceived: (JavaScriptMessage message) async {
          try {
            final downloadDir = Directory('/storage/emulated/0/Download');
            final dirPath = downloadDir.existsSync()
                ? downloadDir.path
                : (await getApplicationDocumentsDirectory()).path;

            final timestamp = DateTime.now().millisecondsSinceEpoch;
            final file = File('$dirPath/rover_blocks_$timestamp.xml');
            await file.writeAsString(message.message);

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

    // Automatically grant WebRTC Camera permissions on the platform controller
    if (_controller.platform is AndroidWebViewController) {
      final androidController = _controller.platform as AndroidWebViewController;
      androidController.setMediaPlaybackRequiresUserGesture(false);
      androidController.setOnPlatformPermissionRequest((request) {
        request.grant();
      });
    }

    _controller.loadFlutterAsset('assets/web/index.html');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: WebViewWidget(controller: _controller),
      ),
    );
  }
}