function registerPythonBlock(type, generatorFn) {
        if (Blockly.Python.forBlock) {
                Blockly.Python.forBlock[type] = generatorFn;
        }
        Blockly.Python[type] = generatorFn;
}

// Buzzer Generators
registerPythonBlock('lib_buzzer_initialize', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["Buzzer(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_buzzer_buzz', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        var b = Blockly.Python.valueToCode(a, "secs", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".buzz(secs=" + b + ")\n"
});

registerPythonBlock('lib_buzzer_off', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".off()\n"
});

// LED Generators
registerPythonBlock('lib_led_initialize', function (a) {
        Blockly.Python.definitions_.import_led = "from uqtpy.actuators.led import LED";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "LED(ob=" + a + ")" : "LED(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_led_brightness', function (a) {
        Blockly.Python.definitions_.import_led = "from uqtpy.actuators.led import LED";
        var b = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "led_object", Blockly.Python.ORDER_MEMBER) + ".on(brightness=" + b + ")\n"
});

registerPythonBlock('lib_led_off', function (a) {
        Blockly.Python.definitions_.import_led = "from uqtpy.actuators.led import LED";
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

// Added by script
registerPythonBlock('lib_argb_initialize', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = ("1"),
                c = a.getFieldValue("n");
        a = a.getFieldValue("ob");
        return ["0" === b ? "ARGB( pixels=" + c + ",ob=" + a + ")" : "ARGB(port=" + b + ", pixels=" + c + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_argb_clear', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".clear(pixels=" + b + ")\n"
});

registerPythonBlock('lib_argb_red', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".red(pixels=" + c + ", brightness=" + a + ")\n"
});

registerPythonBlock('lib_argb_green', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".green(pixels=" + c + ", brightness=" + a + ")\n"
});

registerPythonBlock('lib_argb_blue', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".blue(pixels=" + c + ",  brightness=" + a + ")\n"
});

registerPythonBlock('lib_argb_clear_all', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".clear()\n"
});

registerPythonBlock('lib_argb_show', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".show()\n"
});

registerPythonBlock('lib_argb_set', function (a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_ATOMIC),
                c = Blockly.Python.valueToCode(a, "red", Blockly.Python.ORDER_ATOMIC),
                d = Blockly.Python.valueToCode(a, "green", Blockly.Python.ORDER_ATOMIC),
                e = Blockly.Python.valueToCode(a, "blue", Blockly.Python.ORDER_ATOMIC),
                f = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = a.getFieldValue("show");
        return f +
                ".set_color(index=" + b + ",red=" + c + ", green=" + d + ", blue=" + e + ", show=" + a + ")\n"
});

registerPythonBlock('lib_buzzer_initialize', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["Buzzer(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_buzzer_on', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".on()\n"
});

registerPythonBlock('lib_buzzer_off', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".off()\n"
});

registerPythonBlock('lib_buzzer_buzz', function (a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        var b = Blockly.Python.valueToCode(a, "secs", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".buzz(secs=" + b + ")\n"
});

registerPythonBlock('lib_display_oled_initialize', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "height", Blockly.Python.ORDER_NONE) || "0",
                c = Blockly.Python.valueToCode(a, "width", Blockly.Python.ORDER_NONE) || "0";
        a = ("1");
        return ["0" === a ? "OLED(height=" + b + ", width=" + c + ")" : "OLED(port=" + a + ", height=" + b + ", width=" + c + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_display_oled_clear', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".clear()\n"
});

registerPythonBlock('lib_display_oled_show', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".show()\n"
});

registerPythonBlock('lib_display_oled_draw_pixel', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "y", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_pixel(" + b + "," + c + ", 1)\n"
});

registerPythonBlock('lib_display_oled_draw_text', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "text", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "row", Blockly.Python.ORDER_NONE),
                d = Blockly.Python.valueToCode(a, "column", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_text(text =" + b + ", row=" + c + ",column=" + d + ")\n"
});

registerPythonBlock('lib_display_oled_draw_line', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x1", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "y1", Blockly.Python.ORDER_NONE),
                d = Blockly.Python.valueToCode(a, "x2", Blockly.Python.ORDER_NONE),
                e = Blockly.Python.valueToCode(a, "y2", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_line(" + b + "," + c + "," + d + "," + e + ",1" + ")\n"
});

registerPythonBlock('lib_display_oled_draw_rect', function (a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x1", Blockly.Python.ORDER_NONE),
                c = Blockly.Python.valueToCode(a, "y1", Blockly.Python.ORDER_NONE),
                d = Blockly.Python.valueToCode(a, "x2", Blockly.Python.ORDER_NONE),
                e = Blockly.Python.valueToCode(a, "y2", Blockly.Python.ORDER_NONE),
                f = Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER);
        a = a.getFieldValue("infill");
        return f +
                ".draw_rectangle(" + b + "," + c + "," + d + "," + e + ",1," + a + ")\n"
});



registerPythonBlock('lib_ldr_initialize', function (a) {
        Blockly.Python.definitions_.import_ldr = "from uqtpy.sensors.ldr import LDR";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "LDR(ob=" + a + ")" : "LDR(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_ldr_read', function (a) {
        Blockly.Python.definitions_.import_ldr = "from uqtpy.sensors.ldr import LDR";
        return [Blockly.Python.valueToCode(a, "ldr_object", Blockly.Python.ORDER_MEMBER) + ".read_ldr()", Blockly.Python.ORDER_MEMBER]
});


registerPythonBlock('lib_left_motor_initialize', function (a) {
        Blockly.Python.definitions_.import_left_motor = "from uqtpy.actuators.motor import LeftMotor";
        var b = ("1");
        a = a.getFieldValue("ob");
        return [0 < b.length ? "LeftMotor(port=" + b + ",ob=" + a + ")" : "LeftMotor(ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_right_motor_initialize', function (a) {
        Blockly.Python.definitions_.import_right_motor = "from uqtpy.actuators.motor import RightMotor";
        var b = ("1");
        a = a.getFieldValue("ob");
        return [0 < b.length ? "RightMotor(port=" + b + ",ob=" + a + ")" : "RightMotor(ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_motor_rotate', function (a) {
        Blockly.Python.definitions_.import_motor = "from uqtpy.actuators.motor import Motor";
        var b = Blockly.Python.valueToCode(a, "motor_object", Blockly.Python.ORDER_MEMBER),
                c = Blockly.Python.valueToCode(a, "motor_speed", Blockly.Python.ORDER_NONE);
        a = Blockly.Python.valueToCode(a, "motor_direction", Blockly.Python.ORDER_NONE);
        return b + ".rotate(speed=" + c + ", direction=" + a + ")\n"
});

registerPythonBlock('lib_mpu6050_initialize', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "MPU6050(ob=" + a + ")" : "MPU6050(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_mpu6050_enable_gyro', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_gyro()\n"
});

registerPythonBlock('lib_mpu6050_disable_gyro', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_gyro()\n"
});

registerPythonBlock('lib_mpu6050_enable_accel', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_accel()\n"
});

registerPythonBlock('lib_mpu6050_disable_accel', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_accel()\n"
});

registerPythonBlock('lib_mpu6050_enable_temp', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_temp()\n"
});

registerPythonBlock('lib_mpu6050_disa_temp', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_temp()\n"
});

registerPythonBlock('lib_mpu6050_get_accel', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_accel()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_mpu6050_get_gyro', function (a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_gyro()", Blockly.Python.ORDER_MEMBER]
});


registerPythonBlock('lib_pumpmotor_initialize', function (a) {
        Blockly.Python.definitions_.import_pumpmotor = "from uqtpy.actuators.pumpmotor import PumpMotor";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["PumpMotor(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_pumpmotor_run', function (a) {
        Blockly.Python.definitions_.import_pumpmotor = "from uqtpy.actuators.pumpmotor import PumpMotor";
        var b = Blockly.Python.valueToCode(a, "pumpmotor_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pumpmotor_speed", Blockly.Python.ORDER_NONE);
        return b + ".run(speed=" + a + ")\n"
});

registerPythonBlock('lib_servo_initialize', function (a) {
        Blockly.Python.definitions_.import_servo = "from uqtpy.actuators.servo import Servo";
        var b = ("1"),
                c = Blockly.Python.valueToCode(a, "step", Blockly.Python.ORDER_NONE) || "1",
                d = Blockly.Python.valueToCode(a, "delay", Blockly.Python.ORDER_NONE) || "1",
                e = a.getFieldValue("start_angle");
        a = a.getFieldValue("ob");
        return ["Servo(port=" + b + ",step=" + c + ", step_delay=" + d + ", start_position=" + e + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_servo_rotate', function (a) {
        Blockly.Python.definitions_.import_servo = "from uqtpy.actuators.servo import Servo";
        var b = a.getFieldValue("degree");
        return Blockly.Python.valueToCode(a, "servo_object", Blockly.Python.ORDER_MEMBER) + ".rotate(stop_angle=" + b + ")\n"
});


registerPythonBlock('lib_tof_initialize', function (a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "TOF(ob=" + a + ")" : "TOF(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_tof_read_distance', function (a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        return [Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".read_distance()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_tof_reset', function (a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        return [Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".reset()", Blockly.Python.ORDER_MEMBER]
});


// Added AHT20
registerPythonBlock('lib_aht20_initialize', function (a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";
        var b = ("1");
        a = a.getFieldValue("ob");
        return ["0" === b ? "AHT20(ob=" + a + ")" : "AHT20(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_temperature_read', function (a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";

        return [Blockly.Python.valueToCode(a, "aht20_object", Blockly.Python.ORDER_MEMBER) + ".read_temperature()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('lib_humidity_read', function (a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";

        return [Blockly.Python.valueToCode(a, "aht20_object", Blockly.Python.ORDER_MEMBER) + ".read_humidity()", Blockly.Python.ORDER_MEMBER]
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