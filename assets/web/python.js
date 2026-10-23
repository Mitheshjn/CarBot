function registerPythonBlock(type, generatorFn) {
        if (Blockly.Python.forBlock) {
                Blockly.Python.forBlock[type] = generatorFn;
        }
        Blockly.Python[type] = generatorFn;
}

// Buzzer Generators
registerPythonBlock('lib_buzzer_initialize', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from blocks.actuators.buzzer import Buzzer";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["Buzzer(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_buzzer_buzz', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from blocks.actuators.buzzer import Buzzer";
        var b = Blockly.Python.valueToCode(a, "secs", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".buzz(secs=" + b + ")\n"
});

registerPythonBlock('lib_buzzer_off', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from blocks.actuators.buzzer import Buzzer";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".off()\n"
});

// LED Generators
registerPythonBlock('lib_led_initialize', function (a) {
        Blockly.Python.definitions_.import_led = "from blocks.actuators.led import LED";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "LED(ob=" + a + ")" : "LED(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_led_brightness', function (a) {
        Blockly.Python.definitions_.import_led = "from blocks.actuators.led import LED";
        var b = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "led_object", Blockly.Python.ORDER_MEMBER) + ".on(brightness=" + b + ")\n"
});

registerPythonBlock('lib_led_off', function (a) {
        Blockly.Python.definitions_.import_led = "from blocks.actuators.led import LED";
        return Blockly.Python.valueToCode(a, "led_object", Blockly.Python.ORDER_MEMBER) + ".off()\n"
});

// Sleep Generators
registerPythonBlock('lib_neo_sleep', function (a) {
        Blockly.Python.definitions_.import_neo_sleep = "from time import sleep";
        return "sleep(" + Blockly.Python.valueToCode(a, "duration", Blockly.Python.ORDER_ATOMIC) + ")\n"
});

registerPythonBlock('lib_neo_sleep_ms', function (a) {
        Blockly.Python.definitions_.import_neo_sleep_ms = "from time import sleep_ms";
        return "sleep_ms(" + Blockly.Python.valueToCode(a, "duration", Blockly.Python.ORDER_ATOMIC) + ")\n"
});

// ARGB Generators
registerPythonBlock('lib_argb_initialize', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        var b = ("1"),
                c = a.getFieldValue("n");
        a = a.getFieldValue("ob");
        return ["0" === b ? "ARGB( pixels=" + c + ",ob=" + a + ")" : "ARGB(port=" + b + ", pixels=" + c + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_argb_clear', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".clear(pixels=" + b + ")\n"
});

registerPythonBlock('lib_argb_red', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".red(pixels=" + c + ", brightness=" + a + ")\n"
});

registerPythonBlock('lib_argb_green', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".green(pixels=" + c + ", brightness=" + a + ")\n"
});

registerPythonBlock('lib_argb_blue', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".blue(pixels=" + c + ",  brightness=" + a + ")\n"
});

registerPythonBlock('lib_argb_clear_all', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".clear()\n"
});

registerPythonBlock('lib_argb_show', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".show()\n"
});

registerPythonBlock('lib_argb_set', function (a) {
        Blockly.Python.definitions_.import_argb = "from blocks.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_ATOMIC),
                c = Blockly.Python.valueToCode(a, "red", Blockly.Python.ORDER_ATOMIC),
                d = Blockly.Python.valueToCode(a, "green", Blockly.Python.ORDER_ATOMIC),
                e = Blockly.Python.valueToCode(a, "blue", Blockly.Python.ORDER_ATOMIC),
                f = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = a.getFieldValue("show");
        return f +
                ".set_color(index=" + b + ",red=" + c + ", green=" + d + ", blue=" + e + ", show=" + a + ")\n"
});

// OLED Display Generators
registerPythonBlock('lib_display_oled_initialize', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "height", Blockly.Python.ORDER_NONE) || "0",
                c = Blockly.Python.valueToCode(a, "width", Blockly.Python.ORDER_NONE) || "0",
                d = a.getFieldValue("ob");
        a = ("1");
        return ["0" === a ? "OLED(height=" + b + ", width=" + c + ",ob=" + d + ")" : "OLED(port=" + a + ", height=" + b + ", width=" + c + ",ob=" + d + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_display_oled_clear', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".clear()\n"
});

registerPythonBlock('lib_display_oled_show', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".show()\n"
});

registerPythonBlock('lib_display_oled_draw_pixel', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "y", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_pixel(" + b + "," + c + ", 1)\n"
});

registerPythonBlock('lib_display_oled_draw_text', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "text", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "row", Blockly.Python.ORDER_NONE),
                d = Blockly.Python.valueToCode(a, "column", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_text(text =" + b + ", row=" + c + ",column=" + d + ")\n"
});

registerPythonBlock('lib_display_oled_draw_line', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x1", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "y1", Blockly.Python.ORDER_NONE),
                d = Blockly.Python.valueToCode(a, "x2", Blockly.Python.ORDER_NONE),
                e = Blockly.Python.valueToCode(a, "y2", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_line(" + b + "," + c + "," + d + "," + e + ",1" + ")\n"
});

registerPythonBlock('lib_display_oled_draw_rect', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from blocks.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x1", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "y1", Blockly.Python.ORDER_NONE),
                d = Blockly.Python.valueToCode(a, "x2", Blockly.Python.ORDER_NONE),
                e = Blockly.Python.valueToCode(a, "y2", Blockly.Python.ORDER_NONE),
                f = Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER);
        a = a.getFieldValue("infill");
        return f +
                ".draw_rectangle(" + b + "," + c + "," + d + "," + e + ",1," + a + ")\n"
});

// LDR Generators
registerPythonBlock('lib_ldr_initialize', function (a) {
        Blockly.Python.definitions_.import_ldr = "from blocks.sensors.ldr import LDR";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "LDR(ob=" + a + ")" : "LDR(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_ldr_read', function (a) {
        Blockly.Python.definitions_.import_ldr = "from blocks.sensors.ldr import LDR";
        return [Blockly.Python.valueToCode(a, "ldr_object", Blockly.Python.ORDER_MEMBER) + ".read_ldr()", Blockly.Python.ORDER_MEMBER]
});

// Motor Generators
registerPythonBlock('lib_left_motor_initialize', function (a) {
        Blockly.Python.definitions_.import_left_motor = "from blocks.actuators.motor import LeftMotor";
        var b = ("1");
        a = a.getFieldValue("ob");
        return [0 < b.length ? "LeftMotor(port=" + b + ",ob=" + a + ")" : "LeftMotor(ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_right_motor_initialize', function (a) {
        Blockly.Python.definitions_.import_right_motor = "from blocks.actuators.motor import RightMotor";
        var b = ("1");
        a = a.getFieldValue("ob");
        return [0 < b.length ? "RightMotor(port=" + b + ",ob=" + a + ")" : "RightMotor(ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_motor_rotate', function (a) {
        Blockly.Python.definitions_.import_motor = "from blocks.actuators.motor import Motor";
        var b = Blockly.Python.valueToCode(a, "motor_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "motor_speed", Blockly.Python.ORDER_NONE);
        a = Blockly.Python.valueToCode(a, "motor_direction", Blockly.Python.ORDER_NONE);
        return b + ".rotate(speed=" + c + ", direction=" + a + ")\n"
});

// MPU6050 Generators
registerPythonBlock('lib_mpu6050_initialize', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "MPU6050(ob=" + a + ")" : "MPU6050(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_mpu6050_enable_gyro', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_gyro()\n"
});

registerPythonBlock('lib_mpu6050_disable_gyro', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_gyro()\n"
});

registerPythonBlock('lib_mpu6050_enable_accel', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_accel()\n"
});

registerPythonBlock('lib_mpu6050_disable_accel', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_accel()\n"
});

registerPythonBlock('lib_mpu6050_get_accel', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_accel()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_mpu6050_get_gyro', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from blocks.sensors.mpu6050 import MPU6050";
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_gyro()", Blockly.Python.ORDER_MEMBER]
});

// Servo Generators
registerPythonBlock('lib_servo_initialize', function (a) {
        Blockly.Python.definitions_.import_servo = "from blocks.actuators.servo import Servo";
        var b = ("1"),
                c = Blockly.Python.valueToCode(a, "step", Blockly.Python.ORDER_NONE) || "1",
                d = Blockly.Python.valueToCode(a, "delay", Blockly.Python.ORDER_NONE) || "1",
                e = a.getFieldValue("start_angle");
        a = a.getFieldValue("ob");
        return ["Servo(port=" + b + ",step=" + c + ", step_delay=" + d + ", start_position=" + e + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_servo_rotate', function (a) {
        Blockly.Python.definitions_.import_servo = "from blocks.actuators.servo import Servo";
        var b = a.getFieldValue("degree");
        return Blockly.Python.valueToCode(a, "servo_object", Blockly.Python.ORDER_MEMBER) + ".rotate(stop_angle=" + b + ")\n"
});

// TOF Generators
registerPythonBlock('lib_tof_initialize', function (a) {
        Blockly.Python.definitions_.import_tof = "from blocks.sensors.tof import TOF";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "TOF(ob=" + a + ")" : "TOF(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_tof_read_distance', function (a) {
        Blockly.Python.definitions_.import_tof = "from blocks.sensors.tof import TOF";
        return [Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".read_distance()", Blockly.Python.ORDER_MEMBER]
});

// DHT22 Generators
registerPythonBlock('lib_dht22_initialize', function (a) {
        Blockly.Python.definitions_.import_dht22 = "from blocks.sensors.dht22 import DHT22";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "DHT22(ob=" + a + ")" : "DHT22(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_temperature_read', function (a) {
        Blockly.Python.definitions_.import_dht22 = "from blocks.sensors.dht22 import DHT22";
        return [Blockly.Python.valueToCode(a, "dht22_object", Blockly.Python.ORDER_MEMBER) + ".read_temperature()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_humidity_read', function (a) {
        Blockly.Python.definitions_.import_dht22 = "from blocks.sensors.dht22 import DHT22";
        return [Blockly.Python.valueToCode(a, "dht22_object", Blockly.Python.ORDER_MEMBER) + ".read_humidity()", Blockly.Python.ORDER_MEMBER]
});

// Sleep Generators
registerPythonBlock('lib_neo_sleep', function (block) {
        Blockly.Python.definitions_['import_neo_sleep'] = 'from time import sleep';
        const duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC) || '0';
        return `sleep(${duration})\n`;
});

registerPythonBlock('lib_neo_sleep_ms', function (block) {
        Blockly.Python.definitions_['import_neo_sleep_ms'] = 'from time import sleep_ms';
        const duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC) || '0';
        return `sleep_ms(${duration})\n`;
});

// Camera Generators
registerPythonBlock('lib_camera_initialize', function (a) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "Camera(ob=" + a + ")" : "Camera(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('lib_camera_take_picture', function (a) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var b = Blockly.Python.valueToCode(a, "camera_object", Blockly.Python.ORDER_MEMBER) || "camera";
        return [b + ".take_picture()", Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('lib_camera_convert_to_grayscale', function (a) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var b = Blockly.Python.valueToCode(a, "camera_object", Blockly.Python.ORDER_MEMBER) || "camera";
        return [b + ".convert_to_grayscale()", Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('lib_camera_read_console_values', function (a) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var b = Blockly.Python.valueToCode(a, "camera_object", Blockly.Python.ORDER_MEMBER) || "camera";
        return [b + ".read_console_values()", Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('lib_camera_button', function (block) {
        var num = block.getFieldValue('NUM') || '1';
        return [num, Blockly.Python.ORDER_ATOMIC];
});

registerPythonBlock('lib_camera_train_classifier', function (block) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var classifierType = block.getFieldValue('CLASSIFIER') || 'image';
        var buttonVal = Blockly.Python.valueToCode(block, 'BUTTON', Blockly.Python.ORDER_ATOMIC) || '1';
        return `camera.train_classifier("${classifierType}", ${buttonVal}, 20)\n`;
});

registerPythonBlock('lib_camera_clear', function (block) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var b = Blockly.Python.valueToCode(block, "camera_object", Blockly.Python.ORDER_MEMBER) || "camera";
        return b + ".clear()\n";
});

registerPythonBlock('lib_camera_switch_div', function (block) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var divVal = block.getFieldValue('DIV') || 'block-finger-tracking';
        return `camera.switch_div("${divVal}")\n`;
});

registerPythonBlock('lib_camera_switch_module', function (block) {
        Blockly.Python.definitions_.import_camera = "from blocks.sensors.camera import Camera";
        var modVal = block.getFieldValue('MODULE') || block.getFieldValue('DIV') || 'block-finger-tracking';
        return `camera.switch_module("${modVal}")\n`;
});

registerPythonBlock('lib_camera_div', function (block) {
        var divVal = block.getFieldValue('DIV') || block.getFieldValue('MODULE') || 'block-finger-tracking';
        return [`"${divVal}"`, Blockly.Python.ORDER_ATOMIC];
});