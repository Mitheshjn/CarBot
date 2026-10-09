<<<<<<< HEAD
function registerPythonBlock(type, generatorFn) {
  if (Blockly.Python.forBlock) {
    Blockly.Python.forBlock[type] = generatorFn;
  }
  Blockly.Python[type] = generatorFn;
}

// Buzzer Generators
registerPythonBlock('qtpi_buzzer_initialize', function(block) {
  Blockly.Python.definitions_['import_buzzer'] = 'from uqtpy.actuators.buzzer import Buzzer';
  const port = block.getFieldValue('port');
  const ob = block.getFieldValue('ob');
  return [`Buzzer(port=${port}, ob=${ob})`, Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('qtpi_buzzer_buzz', function(block) {
  Blockly.Python.definitions_['import_buzzer'] = 'from uqtpy.actuators.buzzer import Buzzer';
  const buzzerObj = Blockly.Python.valueToCode(block, 'buzzer_object', Blockly.Python.ORDER_MEMBER) || 'None';
  const secs = Blockly.Python.valueToCode(block, 'secs', Blockly.Python.ORDER_NONE) || '1';
  return `${buzzerObj}.buzz(secs=${secs})\n`;
});

registerPythonBlock('qtpi_buzzer_off', function(block) {
  Blockly.Python.definitions_['import_buzzer'] = 'from uqtpy.actuators.buzzer import Buzzer';
  const buzzerObj = Blockly.Python.valueToCode(block, 'buzzer_object', Blockly.Python.ORDER_MEMBER) || 'None';
  return `${buzzerObj}.off()\n`;
});

// LED Generators
registerPythonBlock('qtpi_led_initialize', function(block) {
  Blockly.Python.definitions_['import_led'] = 'from uqtpy.actuators.led import LED';
  const port = block.getFieldValue('port');
  const ob = block.getFieldValue('ob');
  return [`LED(port=${port}, ob=${ob})`, Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('qtpi_led_brightness', function(block) {
  Blockly.Python.definitions_['import_led'] = 'from uqtpy.actuators.led import LED';
  const ledObj = Blockly.Python.valueToCode(block, 'led_object', Blockly.Python.ORDER_MEMBER) || 'None';
  const brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_NONE) || '0';
  return `${ledObj}.on(brightness=${brightness})\n`;
});

registerPythonBlock('qtpi_led_off', function(block) {
  Blockly.Python.definitions_['import_led'] = 'from uqtpy.actuators.led import LED';
  const ledObj = Blockly.Python.valueToCode(block, 'led_object', Blockly.Python.ORDER_MEMBER) || 'None';
  return `${ledObj}.off()\n`;
});

// Sleep Generators
registerPythonBlock('qtpi_neo_sleep', function(block) {
  Blockly.Python.definitions_['import_neo_sleep'] = 'from time import sleep';
  const duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC) || '0';
  return `sleep(${duration})\n`;
});

registerPythonBlock('qtpi_neo_sleep_ms', function(block) {
  Blockly.Python.definitions_['import_neo_sleep_ms'] = 'from time import sleep_ms';
  const duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC) || '0';
  return `sleep_ms(${duration})\n`;
=======
function registerPythonBlock(type, generatorFn) {
  if (Blockly.Python.forBlock) {
    Blockly.Python.forBlock[type] = generatorFn;
  }
  Blockly.Python[type] = generatorFn;
}

// Buzzer Generators
registerPythonBlock('qtpi_buzzer_initialize', function(block) {
  Blockly.Python.definitions_['import_buzzer'] = 'from uqtpy.actuators.buzzer import Buzzer';
  const port = block.getFieldValue('port');
  const ob = block.getFieldValue('ob');
  return [`Buzzer(port=${port}, ob=${ob})`, Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('qtpi_buzzer_buzz', function(block) {
  Blockly.Python.definitions_['import_buzzer'] = 'from uqtpy.actuators.buzzer import Buzzer';
  const buzzerObj = Blockly.Python.valueToCode(block, 'buzzer_object', Blockly.Python.ORDER_MEMBER) || 'None';
  const secs = Blockly.Python.valueToCode(block, 'secs', Blockly.Python.ORDER_NONE) || '1';
  return `${buzzerObj}.buzz(secs=${secs})\n`;
});

registerPythonBlock('qtpi_buzzer_off', function(block) {
  Blockly.Python.definitions_['import_buzzer'] = 'from uqtpy.actuators.buzzer import Buzzer';
  const buzzerObj = Blockly.Python.valueToCode(block, 'buzzer_object', Blockly.Python.ORDER_MEMBER) || 'None';
  return `${buzzerObj}.off()\n`;
});

// LED Generators
registerPythonBlock('qtpi_led_initialize', function(block) {
  Blockly.Python.definitions_['import_led'] = 'from uqtpy.actuators.led import LED';
  const port = block.getFieldValue('port');
  const ob = block.getFieldValue('ob');
  return [`LED(port=${port}, ob=${ob})`, Blockly.Python.ORDER_MEMBER];
});

registerPythonBlock('qtpi_led_brightness', function(block) {
  Blockly.Python.definitions_['import_led'] = 'from uqtpy.actuators.led import LED';
  const ledObj = Blockly.Python.valueToCode(block, 'led_object', Blockly.Python.ORDER_MEMBER) || 'None';
  const brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_NONE) || '0';
  return `${ledObj}.on(brightness=${brightness})\n`;
});

registerPythonBlock('qtpi_led_off', function(block) {
  Blockly.Python.definitions_['import_led'] = 'from uqtpy.actuators.led import LED';
  const ledObj = Blockly.Python.valueToCode(block, 'led_object', Blockly.Python.ORDER_MEMBER) || 'None';
  return `${ledObj}.off()\n`;
});

// Sleep Generators
registerPythonBlock('qtpi_neo_sleep', function(block) {
  Blockly.Python.definitions_['import_neo_sleep'] = 'from time import sleep';
  const duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC) || '0';
  return `sleep(${duration})\n`;
});

registerPythonBlock('qtpi_neo_sleep_ms', function(block) {
  Blockly.Python.definitions_['import_neo_sleep_ms'] = 'from time import sleep_ms';
  const duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC) || '0';
  return `sleep_ms(${duration})\n`;
});

// Added by script
registerPythonBlock('qtpi_argb_initialize', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = a.getFieldValue("port"),
            c = a.getFieldValue("n");
        a = a.getFieldValue("ob");
        return ["0" === b ? "ARGB( pixels=" + c + ",ob=" + a + ")" : "ARGB(port=" + b + ", pixels=" + c + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_argb_clear', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".clear(pixels=" + b + ")\n"
});

registerPythonBlock('qtpi_argb_red', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
            c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".red(pixels=" + c + ", brightness=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_green', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
            c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".green(pixels=" + c + ", brightness=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_blue', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER),
            c = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        a = Blockly.Python.valueToCode(a, "brightness", Blockly.Python.ORDER_NONE);
        return b + ".blue(pixels=" + c + ",  brightness=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_orange', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        return b + ".orange(pixels=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_yellow', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        return b + ".yellow(pixels=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_white', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        return b + ".white(pixels=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_indigo', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        return b + ".indigo(pixels=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_violet', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        var b = Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE) || "[]";
        return b + ".violet(pixels=" + a + ")\n"
});

registerPythonBlock('qtpi_argb_clear_all', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".clear()\n"
});

registerPythonBlock('qtpi_argb_show', function(a) {
        Blockly.Python.definitions_.import_argb = "from uqtpy.actuators.argb import ARGB";
        return Blockly.Python.valueToCode(a, "argb_object", Blockly.Python.ORDER_MEMBER) + ".show()\n"
});

registerPythonBlock('qtpi_argb_set', function(a) {
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

registerPythonBlock('qtpi_buzzer_initialize', function(a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["Buzzer(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_buzzer_on', function(a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".on()\n"
});

registerPythonBlock('qtpi_buzzer_off', function(a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".off()\n"
});

registerPythonBlock('qtpi_buzzer_buzz', function(a) {
        Blockly.Python.definitions_.import_buzzer = "from uqtpy.actuators.buzzer import Buzzer";
        var b = Blockly.Python.valueToCode(a, "secs", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "buzzer_object", Blockly.Python.ORDER_MEMBER) + ".buzz(secs=" + b + ")\n"
});

registerPythonBlock('qtpi_display_oled_initialize', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "height", Blockly.Python.ORDER_NONE) || "0",
            c = Blockly.Python.valueToCode(a, "width", Blockly.Python.ORDER_NONE) || "0";
        a = a.getFieldValue("port");
        return ["0" === a ? "OLED(height=" + b + ", width=" + c + ")" : "OLED(port=" + a + ", height=" + b + ", width=" + c + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_display_oled_clear', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".clear()\n"
});

registerPythonBlock('qtpi_display_oled_show', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".show()\n"
});

registerPythonBlock('qtpi_display_oled_draw_pixel', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x", Blockly.Python.ORDER_NONE),
            c = Blockly.Python.valueToCode(a, "y", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_pixel(" + b + "," + c + ", 1)\n"
});

registerPythonBlock('qtpi_display_oled_draw_text', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "text", Blockly.Python.ORDER_NONE),
            c = Blockly.Python.valueToCode(a, "row", Blockly.Python.ORDER_NONE),
            d = Blockly.Python.valueToCode(a, "column", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_text(text =" + b + ", row=" + c + ",column=" + d + ")\n"
});

registerPythonBlock('qtpi_display_oled_draw_line', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x1", Blockly.Python.ORDER_NONE),
            c = Blockly.Python.valueToCode(a, "y1", Blockly.Python.ORDER_NONE),
            d = Blockly.Python.valueToCode(a, "x2", Blockly.Python.ORDER_NONE),
            e = Blockly.Python.valueToCode(a, "y2", Blockly.Python.ORDER_NONE);
        return Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER) + ".draw_line("+ b + "," + c + "," + d + "," + e + ",1" + ")\n"
});

registerPythonBlock('qtpi_display_oled_draw_rect', function(a) {
        Blockly.Python.definitions_.import_display_oled = "from uqtpy.actuators.display import OLED";
        var b = Blockly.Python.valueToCode(a, "x1", Blockly.Python.ORDER_NONE),
            c = Blockly.Python.valueToCode(a, "y1", Blockly.Python.ORDER_NONE),
            d = Blockly.Python.valueToCode(a, "x2", Blockly.Python.ORDER_NONE),
            e = Blockly.Python.valueToCode(a, "y2", Blockly.Python.ORDER_NONE),
            f = Blockly.Python.valueToCode(a, "oled_object", Blockly.Python.ORDER_MEMBER);
        a = a.getFieldValue("infill");
        return f +
            ".draw_rectangle("+ b + "," + c + "," + d + "," + e + ",1," + a + ")\n"
});

registerPythonBlock('qtpi_gyro_initialize', function(a) {
        Blockly.Python.definitions_.import_gyro = "from uqtpy.sensors.gyro import GYRO";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["0" === b ? "GYRO(ob=" + a + ")" : "GYRO(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_read_gyro', function(a) {
        return [Blockly.Python.valueToCode(a, "gyro_object", Blockly.Python.ORDER_ATOMIC) + ".read_gyro()", Blockly.Python.ORDER_NONE]
});

registerPythonBlock('qtpi_ldr_initialize', function(a) {
        Blockly.Python.definitions_.import_ldr = "from uqtpy.sensors.ldr import LDR";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["0" === b ? "LDR(ob=" + a + ")" : "LDR(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_ldr_read', function(a) {
        Blockly.Python.definitions_.import_ldr = "from uqtpy.sensors.ldr import LDR";
        return [Blockly.Python.valueToCode(a, "ldr_object", Blockly.Python.ORDER_MEMBER) + ".read_ldr()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_ldr_enable', function(a) {
        Blockly.Python.definitions_.import_ldr = "from uqtpy.sensors.ldr import LDR";
        return Blockly.Python.valueToCode(a, "ldr_object", Blockly.Python.ORDER_MEMBER) + ".enable_ldr()\n"
});

registerPythonBlock('qtpi_ldr_disable', function(a) {
        Blockly.Python.definitions_.import_ldr = "from uqtpy.sensors.ldr import LDR";
        return Blockly.Python.valueToCode(a, "ldr_object", Blockly.Python.ORDER_MEMBER) + ".disable_ldr()\n"
});

registerPythonBlock('qtpi_motor_initialize', function(a) {
        Blockly.Python.definitions_.import_motor = "from uqtpy.actuators.motor import Motor";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return [0 < b.length ? "Motor(port=" + b + ",ob=" + a + ")" : "Motor(ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_motor_rotate', function(a) {
        Blockly.Python.definitions_.import_motor = "from uqtpy.actuators.motor import Motor";
        var b = Blockly.Python.valueToCode(a, "motor_object", Blockly.Python.ORDER_MEMBER),
            c = Blockly.Python.valueToCode(a, "motor_speed", Blockly.Python.ORDER_NONE);
        a = Blockly.Python.valueToCode(a, "motor_direction", Blockly.Python.ORDER_NONE);
        return b + ".rotate(speed=" + c + ", direction=" + a + ")\n"
});

registerPythonBlock('qtpi_mpu6050_initialize', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["0" === b ? "MPU6050(ob=" + a + ")" : "MPU6050(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_mpu6050_enable_gyro', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_gyro()\n"
});

registerPythonBlock('qtpi_mpu6050_disable_gyro', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_gyro()\n"
});

registerPythonBlock('qtpi_mpu6050_enable_accel', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_accel()\n"
});

registerPythonBlock('qtpi_mpu6050_disable_accel', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_accel()\n"
});

registerPythonBlock('qtpi_mpu6050_enable_temp', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".enable_temp()\n"
});

registerPythonBlock('qtpi_mpu6050_disa_temp', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".disable_temp()\n"
});

registerPythonBlock('qtpi_mpu6050_get_accel', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_accel()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_mpu6050_get_gyro', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_gyro()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_mpu6050_get_temp', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_temp()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_mpu6050_get_mpu6050', function(a) {
        Blockly.Python.definitions_.import_mpu6050 = "from uqtpy.sensors.mpu6050 import MPU6050";
        return [Blockly.Python.valueToCode(a, "mpu6050_object", Blockly.Python.ORDER_MEMBER) + ".get_value()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_pumpmotor_initialize', function(a) {
        Blockly.Python.definitions_.import_pumpmotor = "from uqtpy.actuators.pumpmotor import PumpMotor";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["PumpMotor(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_pumpmotor_run', function(a) {
        Blockly.Python.definitions_.import_pumpmotor = "from uqtpy.actuators.pumpmotor import PumpMotor";
        var b = Blockly.Python.valueToCode(a, "pumpmotor_object", Blockly.Python.ORDER_MEMBER);
        a = Blockly.Python.valueToCode(a, "pumpmotor_speed", Blockly.Python.ORDER_NONE);
        return b + ".run(speed=" + a + ")\n"
});

registerPythonBlock('qtpi_servo_initialize', function(a) {
        Blockly.Python.definitions_.import_servo = "from uqtpy.actuators.servo import Servo";
        var b = a.getFieldValue("port"),
            c = Blockly.Python.valueToCode(a, "step", Blockly.Python.ORDER_NONE) || "1",
            d = Blockly.Python.valueToCode(a, "delay", Blockly.Python.ORDER_NONE) || "1",
            e = a.getFieldValue("start_angle");
        a = a.getFieldValue("ob");
        return ["Servo(port=" + b + ",step=" + c + ", step_delay=" + d + ", start_position=" + e + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_servo_rotate', function(a) {
        Blockly.Python.definitions_.import_servo = "from uqtpy.actuators.servo import Servo";
        var b = a.getFieldValue("degree");
        return Blockly.Python.valueToCode(a, "servo_object", Blockly.Python.ORDER_MEMBER) + ".rotate(stop_angle=" + b + ")\n"
});

registerPythonBlock('qtpi_servo_sweep', function(a) {
        Blockly.Python.definitions_.import_servo = "from uqtpy.actuators.servo import Servo";
        var b = Blockly.Python.valueToCode(a, "start_angle", Blockly.Python.ORDER_NONE) || "1",
            c = Blockly.Python.valueToCode(a, "end_angle", Blockly.Python.ORDER_NONE) || "1";
        return Blockly.Python.valueToCode(a, "servo_object", Blockly.Python.ORDER_MEMBER) + ".sweep(start_angle=" + b + ",stop_angle=" + c + ")\n"
});

registerPythonBlock('qtpi_servo_current_position', function(a) {
        Blockly.Python.definitions_.import_servo = "from uqtpy.actuators.servo import Servo";
        return [Blockly.Python.valueToCode(a, "servo_object", Blockly.Python.ORDER_MEMBER) + ".get_current_position()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_tof_initialize', function(a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["0" === b ? "TOF(ob=" + a + ")" : "TOF(port=" + b + ",ob=" + a + ")", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_tof_read_distance', function(a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        return [Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".read_distance()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_tof_reset', function(a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        return [Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".reset()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_tof_enable', function(a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        return Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".enable()\n"
});

registerPythonBlock('qtpi_tof_disable', function(a) {
        Blockly.Python.definitions_.import_tof = "from uqtpy.sensors.tof import TOF";
        return Blockly.Python.valueToCode(a, "tof_object", Blockly.Python.ORDER_MEMBER) + ".disable()\n"
});

// Added AHT20
registerPythonBlock('qtpi_aht20_initialize', function(a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";
        var b = a.getFieldValue("port");
        a = a.getFieldValue("ob");
        return ["0"===b?"AHT20(ob="+a+")":"AHT20(port="+b+",ob="+a+")",Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_temperature_read', function(a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";
        Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return [Blockly.Python.valueToCode(a, "aht20_object", Blockly.Python.ORDER_MEMBER) + ".read_temperature()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_humidity_read', function(a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";
        Blockly.Python.valueToCode(a, "pixel", Blockly.Python.ORDER_NONE);
        return [Blockly.Python.valueToCode(a, "aht20_object", Blockly.Python.ORDER_MEMBER) + ".read_humidity()", Blockly.Python.ORDER_MEMBER]
});

registerPythonBlock('qtpi_aht20_get_aht20', function(a) {
        Blockly.Python.definitions_.import_aht20 = "from uqtpy.sensors.aht20 import AHT20";
        return [Blockly.Python.valueToCode(a, "aht20_object", Blockly.Python.ORDER_MEMBER) + ".read_temperature_humidity()", Blockly.Python.ORDER_MEMBER]
>>>>>>> 179f2f15220ee44caa3f3fab7849d145b8795702
});