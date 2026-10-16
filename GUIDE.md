# 📘 Snap Racer Rover (SRV 2.0) User & Developer Guide

This guide provides step-by-step instructions for pairing, piloting, configuring add-on modules, and programming the **Snap Racer Rover (SRV 2.0)** using the CAR BOT application.

---

## 📑 Table of Contents
1. [Initial Connection Setup](#1-initial-connection-setup)
2. [Driving & Vehicle Controls](#2-driving--vehicle-controls)
3. [FPV Camera Live Streaming](#3-fpv-camera-live-streaming)
4. [Modular Sensor Port & Hardware Add-Ons](#4-modular-sensor-port--hardware-add-ons)
5. [RoverBlocks Visual Studio Guide](#5-roverblocks-visual-studio-guide)
6. [Orientation & Viewport Controls](#6-orientation--viewport-controls)
7. [Troubleshooting & FAQs](#7-troubleshooting--faqs)

---

## 1. Initial Connection Setup

The Snap Racer car broadcasts its own local Wi-Fi Access Point (AP). You do not need a home router or internet access to drive the car.

### Step-by-Step Pairing:
1. **Power On the Car**: Switch on the main battery switch on the rover chassis. Ensure the ESP32 status LEDs illuminate.
2. **Connect Phone to Wi-Fi**:
   - Open your mobile device's **Wi-Fi Settings**.
   - Search for the SSID: `SNAP-RACER`.
   - Connect to the network (no internet warning is normal and expected).
3. **Launch CAR BOT**:
   - Open the **CAR BOT** application.
   - The app will automatically ping `http://192.168.4.1/ping`.
   - When connected, the splash overlay dismisses and a green **"Connected to Snap Racer!"** toast appears.

> [!TIP]
> If your phone prompts *"This network has no internet connection. Stay connected?"*, select **"Yes"** or **"Stay Connected"**, otherwise Android may automatically switch back to cellular data or another Wi-Fi network.

---

## 2. Driving & Vehicle Controls

The app features two distinct driving experiences:

### A. Classic D-Pad Mode (Default)
- **F / B**: Move forward and reverse.
- **L / R**: Turn left and right.
- **STOP**: Immediate hard stop. Releasing directional buttons also issues a stop signal.
- **PWM Speed Slider**: Vertically adjust motor power from `0` (min) to `255` (full speed).

### B. Cockpit Mode
Toggle the **Cockpit Mode** switch on the dashboard to engage the advanced steering cockpit:
- **Interactive Steering Wheel**: Rotate the virtual on-screen steering wheel left and right.
- **Gas (▲) & Reverse (▼) Pedals**: Hold the Gas pedal to accelerate forward at current wheel angle; hold Reverse to back up.
- **Gyroscope Tilt Steering**: 
  - Flip the **Gyro** switch inside Cockpit Mode to **ON**.
  - Physically tilt your phone left or right like a real steering wheel.
  - The steering wheel visually aligns with your device's angle in real-time.

### C. Headlights
- Toggle the **Lights** switch to activate the high-brightness white front LEDs on the rover.

---

## 3. FPV Camera Live Streaming

The rover is equipped with an independent **ESP32-CAM** board streaming MJPEG video over port `81`.

1. Toggle the **Camera** switch on the main dashboard to **ON**.
2. The live video stream will mount in the FPV stream panel (`http://192.168.4.10:81/stream`).
3. If the stream lags or drops due to Wi-Fi interference, tap the **Refresh Stream** (`↻`) button located on the top right of the camera panel to re-synchronize the frame buffer.

> [!NOTE]
> If you see **"Camera Offline"**, verify that the separate ESP32-CAM module has adequate power and is properly seated in its header.

---

## 4. Modular Sensor Port & Hardware Add-Ons

The front modular slot allows instant hot-swapping of sensors and display devices without reprogramming the vehicle.

### Enabling the Sensor Port:
1. Turn on the **Add-Ons** toggle on the main screen.
2. Select your attached module from the **Modular Sensor Port** dropdown.

| Selected Module | Capabilities & Interactive Controls |
| :--- | :--- |
| **VL53L0X Distance** | Millimeter-accurate obstacle distance displayed dynamically in the telemetry readout. |
| **DHT11 / DHT22** | Telemetry displays ambient Temperature (°C) and Relative Humidity (%). |
| **LDR Light Sensor** | Live analog light intensity values (0–4095). |
| **RGB LED Ring** | Select animation presets: *Auto Drive, Tachometer, Police, Rainbow, Chase, Breathing*, pick custom hex colors via the color wheel, and adjust brightness (0–255). |
| **OLED Display** | Select display modes: `Robot Face` (animated eyes track car steering!), `Chrome Dino`, or `Space Invaders`. |
| **Accelerometer** | Live pitch and roll angle readouts. |
| **Servo Motor** | Quick-angle preset buttons: `0°`, `45°`, `90°`, `135°`, and `180°`. |

---

## 5. RoverBlocks Visual Studio Guide

Program autonomous behaviors, sensor-driven obstacle avoidance, and light sequences without writing raw code.

### Opening Blockly Studio:
1. Toggle the **Blockly Studio** switch on the dashboard.
2. The workspace expands with the custom Snap Racer block library:
   - **Logic & Control**: `if/else`, loops, comparisons, variables.
   - **Motors & Driving**: Drive forward/back with custom speed and time duration.
   - **Sensors**: Read distance, read light, read temperature.
   - **Outputs**: Set headlights, servo angles, RGB animations.

### Workspace Controls:
- **Center**: Re-centers blocks in view.
- **+ / −**: Zoom into or out of the block canvas.
- **Delete**: Drag any block onto the red Delete button or tap while a block is selected.

### Viewing Generated Code:
- Tap **👁 Code** to open the dual-tab code modal.
- Inspect the generated **MicroPython / Python** source code or the raw **XML** structure.
- Tap **📋 Copy** to copy code to your clipboard.

### Saving & Loading Files:
- **Download XML**: Tap `💾 Download XML`. Thanks to the native Flutter bridge (`FlutterFileSaver`), the file is automatically saved into your device's public **Download** folder as `rover_blocks_<timestamp>.xml`.
- **Upload XML**: Tap `📂 Upload XML`. The native Android file picker will open allowing you to select any previously saved `.xml` workspace file.

### Running Autonomous Programs Over-The-Air:
- **⬆ Upload & Run on Car**: Compiles your workspace into Python instructions and sends a `POST /uploadCode` request to the car. The rover will immediately begin executing your autonomous script.
- **■ Stop Car**: Sends `GET /stopCode` and `GET /stop` to instantly kill the running script and halt all motors.

---

## 6. Orientation & Viewport Controls

- **Screen Rotation Lock (🔓 / 🔒)**: Located on the top right header.
  - Tapping this button locks the app in either **Landscape** or **Portrait** mode depending on your current device holding angle.
  - Tap again to unlock free rotation.
- **App Reload (↻)**: Located on the top left. Instantly refreshes the controller UI if needed.

---

## 7. Troubleshooting & FAQs

### Q: App shows "Could not reach car. Check Wi-Fi: SNAP-RACER"
- **Solution**:
  1. Open your device Wi-Fi settings and verify you are connected to `SNAP-RACER`.
  2. Disable Mobile Data / Cellular Data temporarily to prevent your phone from bypassing the local Wi-Fi.
  3. Ensure your phone IP address is assigned in the subnet `192.168.4.x` (e.g., `192.168.4.2`).

### Q: Driving controls do not respond
- **Solution**:
  1. Check the battery voltage on the rover (motors may stall if Li-ion cells drop below 6.8V).
  2. Ensure the PWM Speed slider is not set to `0`. Default driving requires at least `120–150` PWM to overcome wheel friction.

### Q: Camera video says "Camera Offline"
- **Solution**:
  1. Verify the camera ribbon cable is firmly seated in the ESP32-CAM socket.
  2. Test browsing directly to `http://192.168.4.10:81/stream` in your browser.
  3. Tap the reload button (`↻`) on the camera panel.

### Q: Where are my downloaded Blockly XML files stored?
- **Solution**: Files are saved to your Android device's standard **Downloads** folder (`/storage/emulated/0/Download/rover_blocks_<timestamp>.xml`). You can access them using any file manager or Google Files.
