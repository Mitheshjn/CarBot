Blockly.defineBlocksWithJsonArray([
  {
    "type": "lib_buzzer_initialize",
    "message0": "Buzzer Onboard %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "input_dummy"
      }
    ],
    "output": "buzzer_object",
    "colour": 260,
    "tooltip": "Initialize buzzer on specified port."
  },
  {
    "type": "lib_buzzer_buzz",
    "message0": "Buzzer %1 Buzz for %2 sec",
    "args0": [
      {
        "type": "input_value",
        "name": "buzzer_object",
        "check": "buzzer_object"
      },
      {
        "type": "input_value",
        "name": "secs",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Buzz for specified seconds."
  },
  {
    "type": "lib_buzzer_off",
    "message0": "Buzzer Off %1",
    "args0": [
      {
        "type": "input_value",
        "name": "buzzer_object",
        "check": "buzzer_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turn buzzer off."
  },
  {
    "type": "lib_buzzer_on",
    "message0": "Buzzer On %1",
    "args0": [
      {
        "type": "input_value",
        "name": "buzzer_object",
        "check": "buzzer_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turn buzzer on."
  },
  {
    "type": "lib_led_initialize",
    "message0": "LED Onboard %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "input_dummy"
      }
    ],
    "output": "led_object",
    "colour": 260,
    "tooltip": "Initialize LED module."
  },
  {
    "type": "lib_led_brightness",
    "message0": "LED %1 Brightness %2",
    "args0": [
      {
        "type": "input_value",
        "name": "led_object",
        "check": "led_object"
      },
      {
        "type": "input_value",
        "name": "brightness",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Set LED brightness (0 - 1023)."
  },
  {
    "type": "lib_led_off",
    "message0": "LED Off %1",
    "args0": [
      {
        "type": "input_value",
        "name": "led_object",
        "check": "led_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turn LED off."
  },
  {
    "type": "lib_neo_sleep",
    "message0": "Sleep %1 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "duration",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Wait for a specified number of seconds."
  },
  {
    "type": "lib_neo_sleep_ms",
    "message0": "Sleep %1 milliseconds",
    "args0": [
      {
        "type": "input_value",
        "name": "duration",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Wait for a specified number of milliseconds."
  },
  {
    "type": "lib_argb_initialize",
    "message0": "ARGB with %1 %2 pixel[s] Onboard %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_dropdown",
        "name": "n",
        "options": [
          [
            "8",
            "8"
          ],
          [
            "2",
            "2"
          ],
          [
            "4",
            "4"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      }
    ],
    "output": "argb_object",
    "colour": 260,
    "tooltip": "Make an object to control any attached ARGB. Specify the number of ARGB's and the port to which they are attached.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#argb.argb"
  },
  {
    "type": "lib_argb_clear",
    "message0": "ARGB Clear  %1 pixel(s) %2",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object"
      },
      {
        "type": "input_value",
        "name": "pixel",
        "check": [
          "Number",
          "Array"
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Clear all argbs controlled by the referenced argb object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#argb.argb.clear"
  },
  {
    "type": "lib_argb_clear_all",
    "message0": "ARGB Clear all pixels %1",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Clear all argbs controlled by the referenced argb object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#argb.argb.clear"
  },
  {
    "type": "lib_argb_show",
    "message0": "ARGB Display %1",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Show / update all the argbs controlled by the referenced argb object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#argb.argb.show"
  },
  {
    "type": "lib_argb_set",
    "message0": "ARGB %1 pixel(s) %2 with red %3 green %4 blue %5 show %6",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object"
      },
      {
        "type": "input_value",
        "name": "pixel",
        "check": [
          "Number",
          "Array"
        ]
      },
      {
        "type": "input_value",
        "name": "red",
        "value": 255,
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "green",
        "value": 255,
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "blue",
        "value": 255,
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "show",
        "options": [
          [
            "False",
            "False"
          ],
          [
            "True",
            "True"
          ]
        ]
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Use the referenced argb object to update the individual argb in a specific numbered position with a red, green, blue (RGB) value.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#using-argbs"
  },
  {
    "type": "lib_argb_red",
    "message0": "ARGB Red %1 pixel(s) %2 brightness %3",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "pixel",
        "check": [
          "Number",
          "Array"
        ],
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "brightness",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turns led into RED color of selected index",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#using-argbs"
  },
  {
    "type": "lib_argb_green",
    "message0": "ARGB Green %1 pixel(s) %2 brightness %3",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object"
      },
      {
        "type": "input_value",
        "name": "pixel",
        "check": [
          "Number",
          "Array"
        ],
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "brightness",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Turns led into GREEN color of selected pixel",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#using-argbs"
  },
  {
    "type": "lib_argb_blue",
    "message0": "ARGB Blue %1 pixel(s) %2 brightness %3",
    "args0": [
      {
        "type": "input_value",
        "name": "argb_object",
        "check": "argb_object",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "pixel",
        "check": [
          "Number",
          "Array"
        ],
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "brightness",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "turns led into Blue color of selected pixel",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/argb.html#using-argbs"
  },
  {
    "type": "lib_display_oled_initialize",
    "message0": "OLED %1 width %2 height %3 Onboard %4",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "width",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "height",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      }
    ],
    "inputsInline": false,
    "output": "oled_object",
    "colour": 260,
    "tooltip": "enable oled by the referenced oled object",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_display_oled_clear",
    "message0": "OLED Clear %1",
    "args0": [
      {
        "type": "input_value",
        "name": "oled_object",
        "check": "oled_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": false,
    "colour": 260,
    "tooltip": "enable oled by the referenced oled object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_display_oled_show",
    "message0": "OLED Display %1",
    "args0": [
      {
        "type": "input_value",
        "name": "oled_object",
        "check": "oled_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "enable oled by the referenced oled object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_display_oled_draw_pixel",
    "message0": "OLED Display Pixel %1 x %2 y %3",
    "args0": [
      {
        "type": "input_value",
        "name": "oled_object",
        "check": "oled_object",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "x",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "y",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Show / update all the oled controlled by the referenced oled object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_display_oled_draw_text",
    "message0": "OLED Display Text %1 text %2 row %3 column %4",
    "args0": [
      {
        "type": "input_value",
        "name": "oled_object",
        "check": "oled_object",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "text",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "row",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "column",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Displays string message on oled ",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_display_oled_draw_line",
    "message0": "OLED Display line %1 Start row %2 Start column %3 End row %4 End column %5",
    "args0": [
      {
        "type": "input_value",
        "name": "oled_object",
        "check": "oled_object"
      },
      {
        "type": "input_value",
        "name": "x1",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "y1",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "x2",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "y2",
        "check": "Number"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Show / update all the oled controlled by the referenced oled object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_display_oled_draw_rect",
    "message0": "OLED Display Rectangle %1 Start row %2 Start column %3 End row %4 End column %5 Infill %6",
    "args0": [
      {
        "type": "input_value",
        "name": "oled_object",
        "check": "oled_object"
      },
      {
        "type": "input_value",
        "name": "x1",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "y1",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "x2",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "y2",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "infill",
        "options": [
          [
            "False",
            "False"
          ],
          [
            "True",
            "True"
          ]
        ]
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Show / update all the oled controlled by the referenced oled object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/oled.html#oled"
  },
  {
    "type": "lib_ldr_initialize",
    "message0": "LDR Onboard %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "input_dummy"
      }
    ],
    "output": "ldr_object",
    "colour": 260,
    "tooltip": "Make an object to read any attached LDR. Specify the number of LDR's and the port to which they are attached.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/ldr.html#ldr.ldr"
  },
  {
    "type": "lib_ldr_read",
    "message0": "Read LDR Value from %1",
    "args0": [
      {
        "type": "input_value",
        "name": "ldr_object",
        "check": "ldr_object"
      }
    ],
    "output": "Number",
    "colour": 260,
    "tooltip": "Read ldr values by the referenced ldr object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/ldr.html#ldr"
  },
  {
    "type": "lib_left_motor_initialize",
    "message0": "Left Motor Onboard %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      }
    ],
    "inputsInline": false,
    "output": "motor_object",
    "colour": 260,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lib_right_motor_initialize",
    "message0": "Right Motor Onboard %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      }
    ],
    "inputsInline": false,
    "output": "motor_object",
    "colour": 260,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lib_motor_rotate",
    "message0": "Rotate Motor %1 speed %2 direction %3",
    "args0": [
      {
        "type": "input_value",
        "name": "motor_object",
        "check": "motor_object",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "motor_speed",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "motor_direction",
        "check": "Boolean",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lib_mpu6050_initialize",
    "message0": "MPU6050 Onboard %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "input_dummy"
      }
    ],
    "output": "mpu6050_object",
    "colour": 260,
    "tooltip": "Make an object to control any attached MPU6050. Specify the number of MPU6050's and the port to which they are attached.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html#mpu6050.mpu6050"
  },
  {
    "type": "lib_mpu6050_enable_gyro",
    "message0": "Enable Gyro value Read %1",
    "args0": [
      {
        "type": "input_value",
        "name": "mpu6050_object",
        "check": "mpu6050_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "enable gyro value read by the referenced mpu6050 object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html"
  },
  {
    "type": "lib_mpu6050_disable_gyro",
    "message0": "Disable Gyro Read Value %1",
    "args0": [
      {
        "type": "input_value",
        "name": "mpu6050_object",
        "check": "mpu6050_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "enable mpu6050 by the referenced mpu6050 object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html"
  },
  {
    "type": "lib_mpu6050_get_gyro",
    "message0": "Read Gyro Value %1",
    "args0": [
      {
        "type": "input_value",
        "name": "mpu6050_object",
        "check": "mpu6050_object"
      }
    ],
    "output": "String",
    "colour": 260,
    "tooltip": "Show / update all the mpu6050 controlled by the referenced mpu6050 object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html"
  },
  {
    "type": "lib_mpu6050_enable_accel",
    "message0": "Enable Accel Read Value  %1",
    "args0": [
      {
        "type": "input_value",
        "name": "mpu6050_object",
        "check": "mpu6050_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "enable mpu6050 by the referenced mpu6050 object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html"
  },
  {
    "type": "lib_mpu6050_disable_accel",
    "message0": "Disable Accel Read Value %1",
    "args0": [
      {
        "type": "input_value",
        "name": "mpu6050_object",
        "check": "mpu6050_object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "enable mpu6050 by the referenced mpu6050 object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html#mpu6050.mpu6050.clear"
  },
  {
    "type": "lib_mpu6050_get_accel",
    "message0": "Read Accelerometer Value %1",
    "args0": [
      {
        "type": "input_value",
        "name": "mpu6050_object",
        "check": "mpu6050_object"
      }
    ],
    "output": "String",
    "colour": 260,
    "tooltip": "Show / update all the mpu6050 controlled by the referenced mpu6050 object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/mpu6050.html"
  },
  {
    "type": "lib_servo_initialize",
    "message0": "Servo %1 step %2 delay %3 start position %4 Onboard %5",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "step",
        "check": "Number",
        "value": 0,
        "min": 0
      },
      {
        "type": "input_value",
        "name": "delay",
        "check": "Number",
        "value": 0,
        "min": 0
      },
      {
        "type": "field_number",
        "name": "start_angle",
        "angle": 90
      },
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      }
    ],
    "output": "servo_object",
    "colour": 260,
    "tooltip": "Make an object to control any attached Servo. Specify the Servo and the port to which they are attached.",
    "helpUrl": "https://qtlearncodelab.github.io/lib-shared/docs/uqtpy/html/autoapi/uqtpy/actuators/servo/index.html#initialize"
  },
  {
    "type": "lib_servo_rotate",
    "message0": "Rotate %1 degree %2",
    "args0": [
      {
        "type": "input_value",
        "name": "servo_object",
        "check": "servo_object",
        "align": "RIGHT"
      },
      {
        "type": "field_number",
        "name": "degree",
        "angle": 0,
        "wrap": 180
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": " Rotate the servo object.",
    "helpUrl": "https://qtlearncodelab.github.io/lib-shared/docs/uqtpy/html/autoapi/uqtpy/actuators/servo/index.html#rotate"
  },
  {
    "type": "lib_tof_initialize",
    "message0": "TOF Onboard %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "input_dummy"
      }
    ],
    "output": "tof_object",
    "colour": 260,
    "tooltip": "Make an object to read any attached TOF. Specify the number of TOF's and the port to which they are attached.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/tof.html#tof"
  },
  {
    "type": "lib_tof_read_distance",
    "message0": "TOF Read Distance in Millimeter %1 ",
    "args0": [
      {
        "type": "input_value",
        "name": "tof_object",
        "check": "tof_object"
      }
    ],
    "output": "Number",
    "colour": 260,
    "tooltip": "Read values by the referenced tof object in mm unit.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/tof.html#tof"
  },
  {
    "type": "lib_dht22_initialize",
    "message0": "DHT22 Onboard %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ob",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "input_dummy"
      }
    ],
    "output": "dht22_object",
    "colour": 260,
    "tooltip": "Make an object to read any attached Temperature. Specify the number of Temperature's and the port to which they are attached.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/temperature.html#temperature"
  },
  {
    "type": "lib_temperature_read",
    "message0": "Read Temperature Value %1",
    "args0": [
      {
        "type": "input_value",
        "name": "dht22_object",
        "check": "dht22_object"
      }
    ],
    "output": "Number",
    "colour": 260,
    "tooltip": "Read ir values by the referenced temperature object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/temperature.html#temperature"
  },
  {
    "type": "lib_humidity_read",
    "message0": "Read Humidity Value %1",
    "args0": [
      {
        "type": "input_value",
        "name": "dht22_object",
        "check": "dht22_object"
      }
    ],
    "output": "Number",
    "colour": 260,
    "tooltip": "Read ir values by the referenced temperature object.",
    "helpUrl": "https://schoolrobotics.com/docs/micropython/temperature.html#temperature"
  },
  {
    "type": "lib_neo_sleep",
    "message0": "Sleep %1 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "duration",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Wait for a specified number of seconds."
  },
  {
    "type": "lib_neo_sleep_ms",
    "message0": "Sleep %1 milliseconds",
    "args0": [
      {
        "type": "input_value",
        "name": "duration",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Wait for a specified number of milliseconds."
  }
]);