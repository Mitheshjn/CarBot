Blockly.defineBlocksWithJsonArray([
  // Buzzer Blocks
  {
    "type": "qtpi_buzzer_initialize",
    "message0": "Buzzer Port %1 Onboard %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "port",
        "options": [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]]
      },
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [["True", "True"], ["False", "False"]]
      },
      { "type": "input_dummy" }
    ],
    "output": "buzzer_object",
    "colour": 260,
    "tooltip": "Initialize buzzer on specified port."
  },
  {
    "type": "qtpi_buzzer_buzz",
    "message0": "Buzzer %1 Buzz for %2 sec",
    "args0": [
      { "type": "input_value", "name": "buzzer_object", "check": "buzzer_object" },
      { "type": "input_value", "name": "secs", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Buzz for specified seconds."
  },
  {
    "type": "qtpi_buzzer_off",
    "message0": "Buzzer Off %1",
    "args0": [
      { "type": "input_value", "name": "buzzer_object", "check": "buzzer_object" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turn buzzer off."
  },
  {
    "type": "qtpi_buzzer_on",
    "message0": "Buzzer On %1",
    "args0": [
      { "type": "input_value", "name": "buzzer_object", "check": "buzzer_object" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turn buzzer on."
  },

  // LED Blocks
  {
    "type": "qtpi_led_initialize",
    "message0": "LED Port %1 Onboard %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "port",
        "options": [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]]
      },
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [["True", "True"], ["False", "False"]]
      },
      { "type": "input_dummy" }
    ],
    "output": "led_object",
    "colour": 260,
    "tooltip": "Initialize LED module."
  },
  {
    "type": "qtpi_led_brightness",
    "message0": "LED %1 Brightness %2",
    "args0": [
      { "type": "input_value", "name": "led_object", "check": "led_object" },
      { "type": "input_value", "name": "brightness", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Set LED brightness (0 - 1023)."
  },
  {
    "type": "qtpi_led_off",
    "message0": "LED Off %1",
    "args0": [
      { "type": "input_value", "name": "led_object", "check": "led_object" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turn LED off."
  },

  // System Sleep Blocks
  {
    "type": "qtpi_neo_sleep",
    "message0": "Sleep %1 seconds",
    "args0": [{ "type": "input_value", "name": "duration", "check": "Number" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Wait for a specified number of seconds."
  },
  {
    "type": "qtpi_neo_sleep_ms",
    "message0": "Sleep %1 milliseconds",
    "args0": [{ "type": "input_value", "name": "duration", "check": "Number" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Wait for a specified number of milliseconds."
  }
]);