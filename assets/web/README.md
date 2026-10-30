# Web Assets & RoverBlocks Studio Architecture

This directory houses the core client-side web application and visual programming environment for the CAR BOT (Snap Racer SRV 2.0) platform. The application runs within a native Flutter WebView component, providing telemetry rendering, vehicle control interfaces, and a dual-workspace Google Blockly studio.

---

## Directory Structure

```
assets/web/
├── index.html              # Main application entry point, vehicle controls, Blockly studio & local runner
├── style.css               # Application layout styling, responsive themes, D-Pad and Cockpit interfaces
├── blocks.js               # Blockly custom block definitions for hardware sensors, actuators, and logic
├── python.js               # Blockly Python code generation mappings
├── blockly.min.js          # Google Blockly runtime engine
├── python_compressed.js    # Blockly Python code generator core
├── camera/                 # Embedded computer vision suite
│   ├── index.html          # Computer vision application supporting multi-module execution
│   ├── camera_utils.js     # MediaDevices stream management and fallback handlers
│   ├── control_utils.js    # Computer vision camera pipeline utilities
│   ├── drawing_utils.js    # HTML5 Canvas rendering for landmarks and bounding regions
│   ├── hands.js            # MediaPipe Hands pipeline integration
│   ├── tf.min.js           # TensorFlow.js core runtime
│   ├── mobilenet.js        # MobileNet pre-trained feature extractor
│   └── knn-classifier.js   # K-Nearest Neighbors classifier for live in-browser training
└── README.md               # Directory documentation
```

---

## RoverBlocks Studio Workspaces

The studio implements two isolated workspaces to accommodate different operational requirements:

### 1. Main Blocks (`activeBlockMode === 'main'`)
- **Execution Domain**: On-board ESP32 microcontroller.
- **Workflow**: Assembles visual logic, generates standard MicroPython via `generatePythonCode()`, and transmits the script to the vehicle via HTTP `POST /uploadCode`.
- **Supported Peripherals**: Motor drivers, NeoPixel ARGB arrays, OLED displays, servo motors, VL53L0X distance sensors, LDR illumination sensors, DHT22 temperature/humidity sensors, and MPU6050 IMUs.

### 2. Camera Blocks (`activeBlockMode === 'camera'`)
- **Execution Domain**: Local client environment (WebView / Browser).
- **Workflow**: Transpiles visual logic to asynchronous JavaScript via `transpileCameraPythonToJs()` and executes logic client-side to prevent ESP32 memory exhaustion.
- **Vehicle Driving**: Translates motion requests into high-level REST commands (`/forward`, `/backward`, `/left`, `/right`, `/stop`) fed continuously with an active 250ms keep-alive heartbeat.
- **Data Latching**: Implements state latching (`latchedVisionValue`) to prevent transient frame misses from triggering stop logic prematurely.
- **Inter-Frame Communication**: Synchronizes state with the embedded vision suite using the HTML5 `postMessage` protocol.

---

## Computer Vision Modules (`camera/index.html`)

The embedded vision suite exposes six discrete detection modules:

1. **Finger Tracking (`block-finger-tracking`)**: Real-time hand landmark extraction and finger counting (0 to 5) powered by MediaPipe Hands.
2. **Gesture Classifier (`block-gesture-classifier`)**: Live KNN gesture recognition trained on normalized hand landmark coordinates.
3. **Image Classifier (`block-image-classifier`)**: Multiclass image categorization using TensorFlow.js with a MobileNet backbone.
4. **RGB Coordinates (`block-rgb-coords`)**: Color centroid and blob size tracking in normalized coordinate space.
5. **RGB Color Picker (`block-rgb-colorpicker`)**: Interactive color profiling with HSV tolerance boundaries and live color chip preview.
6. **RGB 3x3 Grid (`block-rgb-grid`)**: 9-region spatial partitioning mapping camera space to discrete cell indices (1 to 9).

---

## Inter-Frame Communication Protocol (`postMessage`)

Communication between the main application (`index.html`) and the vision frame (`camera/index.html`) is structured through JSON messages:

| Action / Event | Direction | Payload | Description |
| :--- | :---: | :--- | :--- |
| `vision_ready` | Frame -> Parent | `{ activeModule }` | Emitted when the vision suite finishes initialization |
| `vision_result` | Frame -> Parent | `{ value, grid, fingerCount, classId, prediction }` | Telemetry payload containing current detection metrics |
| `switch_module` | Parent -> Frame | `{ module }` | Requests activation of a specific vision module |
| `pause` / `resume` | Parent -> Frame | — | Halts or resumes camera rendering loop |
| `switch_cam` | Parent -> Frame | — | Cycles camera input: Front, Rear, and ESP32 stream |
| `clear_classifiers` | Parent -> Frame | — | Resets trained KNN classifier weights and examples |
| `train_classifier` | Parent -> Frame | `{ classifier, button, count }` | Programmatically triggers sample collection |
