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