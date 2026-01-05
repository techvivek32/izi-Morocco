import React, { useEffect, useRef, useState } from "react";

const BlocklyEditor = () => {
  const iframeRef = useRef(null);
  const [blocksJson, setBlocksJson] = useState(null);

  // Add this inside your useEffect for message handling
  useEffect(() => {
    let timeoutId;

    const handleMessage = (event) => {
      if (event.data.type === "BLOCKS_CHANGED") {
        // Debounce the console.log to avoid spamming
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setBlocksJson(event.data.json);
        }, 300); // Wait 300ms after last change
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timeoutId);
    };
  }, []);

  // console.log("Blocks changed:", blocksJson);

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Blockly Puzzle Editor</title>
  <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Arial, sans-serif;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .header {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 30px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header h1 {
      font-size: 28px;
      font-weight: bold;
    }
    .header p {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 5px;
    }
    .download-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s;
    }
    .download-btn:hover {
      background: #059669;
      transform: translateY(-2px);
    }
    .container {
      flex: 1;
      display: flex;
      gap: 20px;
      padding: 20px;
      overflow: hidden;
    }
    .blockly-container {
      flex: 2;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    #blocklyDiv {
      width: 100%;
      height: 100%;
    }
    .output-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .output-panel {
      flex: 1;
      background: #1e293b;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .output-header {
      background: #0f172a;
      padding: 16px 20px;
      border-bottom: 2px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .output-header h3 {
      color: white;
      font-size: 16px;
      font-weight: 600;
    }
    .copy-btn {
      background: #8b5cf6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .copy-btn:hover {
      background: #7c3aed;
    }
    .output-content {
      flex: 1;
      padding: 20px;
      overflow: auto;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #4ade80;
      line-height: 1.6;
      white-space: pre;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>🧩 Blockly Puzzle Editor</h1>
      <p>Click on tabs (Tasks, Logic, Actions) then drag blocks!</p>
    </div>
    <div style="display: flex; gap: 12px;">
      <button class="download-btn" style="background: #f59e0b;" onclick="document.getElementById('xmlInput').click()">📂 Load XML</button>
      <input type="file" id="xmlInput" accept=".xml" style="display: none;" onchange="handleXMLLoad(event)">
      <button class="download-btn" onclick="downloadJSON()">💾 Download JSON</button>
    </div>
  </div>

  <div class="container">
    <div class="blockly-container">
      <div id="blocklyDiv"></div>
    </div>

    <div class="output-container">
      <div class="output-panel">
        <div class="output-header">
          <h3>🎮 Game Engine JSON</h3>
          <button class="copy-btn" onclick="copyJSON()">📋 Copy</button>
        </div>
        <div class="output-content" id="jsonOutput">{}</div>
      </div>

      <div class="output-panel">
        <div class="output-header">
          <h3>📄 XML Export</h3>
          <button class="copy-btn" onclick="copyXML()">📋 Copy</button>
        </div>
        <div class="output-content" id="xmlOutput">&lt;xml&gt;&lt;/xml&gt;</div>
      </div>
    </div>
  </div>

  <script>
    // TASK BLOCKS
    
    // Sample task data - Replace this with your actual questions from database
    const TASKS_DATA = [
      {
        id: "1",
        name: "1",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "2",
        name: "2",
        points: 100,
        answerType: "number"
      },
      {
        id: "3",
        name: "3",
        points: 40,
        answerType: "number"
      },
      {
        id: "4",
        name: "4",
        points: 10,
        answerType: "puzzle"
      },
      {
        id: "5",
        name: "5",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "6",
        name: "6",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "7",
        name: "7",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "8",
        name: "8",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "9",
        name: "9",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "10",
        name: "10",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "11",
        name: "11",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "12",
        name: "12",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "13",
        name: "13",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "14",
        name: "14",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "15",
        name: "15",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "16",
        name: "16",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "17",
        name: "17",
        points: 5,
        answerType: "multiple"
      },
      {
        id: "18",
        name: "18",
        points: 5,
        answerType: "multiple"
      }
    ];

    // Create individual block for each task
    TASKS_DATA.forEach((task, index) => {
      Blockly.Blocks['task_' + index] = {
        init: function() {
          this.appendDummyInput()
            .appendField("📝 " + task.name);
          this.appendDummyInput()
            .appendField("Points: " + task.points)
            .appendField("Type: " + task.answerType);
          this.setOutput(true, null);
          this.setColour(160);
          this.setTooltip("Task ID: " + task.id);
          this.taskData = task;
        }
      };
    });
    
    Blockly.Blocks['all_tasks'] = {
      init: function() {
        this.appendDummyInput().appendField("all tasks");
        this.setOutput(true, null);
        this.setColour(200);
      }
    };

    Blockly.Blocks['tasks_range'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("tasks")
          .appendField(new Blockly.FieldNumber(1, 1, Infinity, 1), "FROM")
          .appendField("to")
          .appendField(new Blockly.FieldNumber(1, 1, Infinity, 1), "TO");
        this.setOutput(true, null);
        this.setColour(200);
      }
    };

    Blockly.Blocks['tasks_with_tag'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("tasks with tag")
          .appendField(new Blockly.FieldTextInput(""), "TAG");
        this.setOutput(true, null);
        this.setColour(200);
      }
    };

    Blockly.Blocks['task_reference'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("📍 Task #")
          .appendField(new Blockly.FieldNumber(0, 0, 999, 1), "TASK_NUM");
        this.setOutput(true, null);
        this.setColour(160);
      }
    };

    // LOGIC BLOCKS
    Blockly.Blocks['when_then_block'] = {
      init: function() {
        this.appendDummyInput().appendField("🔀 When-Then");
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("Condition");
        this.appendStatementInput("DO").appendField("Then");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
      }
    };

    Blockly.Blocks['finished_block'] = {
      init: function() {
        this.appendValueInput("INPUT").setCheck(null);
        this.appendDummyInput().appendField("finished");
        this.setOutput(true, "Boolean");
        this.setColour(160);
      }
    };

    Blockly.Blocks['scan_qr'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("scan QR")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "QR_CHECK");
        this.setOutput(true, "Boolean");
        this.setColour(200);
      }
    };

    

     Blockly.Blocks['answer_is'] = {
      init: function() {
        this.appendValueInput("TASK")
          .setCheck(null)
          .appendField("answer is")
          .appendField(new Blockly.FieldDropdown([["correct", "CORRECT"], ["incorrect", "INCORRECT"]]), "ANSWER")
          .appendField("for");
        this.setOutput(true, "Boolean");
        this.setColour(160);
        this.setInputsInline(true);
      }
    };

    Blockly.Blocks['score_check'] = {
      init: function() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["score", "SCORE"]], this.validate), "METRIC")
          .appendField(new Blockly.FieldDropdown([
            [">", "GT"], 
            ["<", "LT"], 
            ["=", "EQ"], 
            ["≥", "GTE"], 
            ["≤", "LTE"]
          ], this.validate), "OPERATOR")
          .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "VALUE");
        this.setOutput(true, "Boolean");
        this.setColour(260);
      }
    };

    Blockly.Blocks['logic_and_or'] = {
      init: function() {
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean")
          .appendField(new Blockly.FieldDropdown([["and", "AND"], ["or", "OR"]]), "OPERATOR");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(210);
      }
    };

    Blockly.Blocks['logic_not'] = {
      init: function() {
        this.appendValueInput("BOOL").setCheck("Boolean").appendField("not");
        this.setOutput(true, "Boolean");
        this.setColour(210);
      }
    };

    Blockly.Blocks['answer_by_team'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("answer is")
          .appendField(new Blockly.FieldDropdown([["correct", "CORRECT"], ["incorrect", "INCORRECT"]]), "ANSWER")
          .appendField("by any team");
        this.setOutput(true, "Boolean");
        this.setColour(160);
      }
    };

    Blockly.Blocks['last_answer_is'] = {
      init: function() {
        this.appendValueInput("TASK")
          .setCheck(null);
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["last", "LAST"], ["first", "FIRST"]]), "WHICH")
          .appendField("answer is")
          .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "ANSWER_NUM");
        this.setOutput(true, "Boolean");
        this.setColour(160);
        this.setInputsInline(true);
      }
    };

    Blockly.Blocks['date_check'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("date")
          .appendField(new Blockly.FieldDropdown([[">", ">"], ["<", "<"], ["=", "="], [">=", ">="], ["<=", "<="]], "OPERATOR"));
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("2025-01-01"), "DATE");
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("10:00:00"), "TIME");
        this.appendDummyInput()
          .appendField("TZ:")
          .appendField(new Blockly.FieldNumber(0, -12, 14, 0.5), "TZ");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setColour(300);
      }
    };

    Blockly.Blocks['on_track'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("on track")
          .appendField(new Blockly.FieldNumber(1, 1, Infinity, 1), "TRACK");
        this.setOutput(true, "Boolean");
        this.setColour(180);
      }
    };

    Blockly.Blocks['scan_barcode'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("scan barcode")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "BARCODE_CHECK");
        this.setOutput(true, "Boolean");
        this.setColour(200);
      }
    };

    // ACTION BLOCKS
    Blockly.Blocks['show_on_map'] = {
      init: function() {
        this.appendDummyInput().appendField("show ");
        this.appendValueInput("INPUT").setCheck(null);
        this.appendDummyInput().appendField("on map");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
      }
    };

    Blockly.Blocks['show_tasks_on_playground'] = {
      init: function() {
        this.appendDummyInput().appendField("show ");
        this.appendValueInput("INPUT").setCheck(null);
        this.appendDummyInput()
          .appendField("on playground")
          .appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"]
          ]), "PLAYGROUND");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setInputsInline(true);
      }
    };

    Blockly.Blocks['show_in_list'] = {
      init: function() {
        this.appendDummyInput().appendField("show ");
        this.appendValueInput("INPUT").setCheck(null);
        this.appendDummyInput().appendField("in list");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
      }
    };

    Blockly.Blocks['open_for_answering'] = {
      init: function() {
        this.appendDummyInput().appendField("open");
        this.appendValueInput("INPUT").setCheck(null);
        this.appendDummyInput().appendField("for answering");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
      }
    };

    Blockly.Blocks['finish_action'] = {
      init: function() {
        this.appendDummyInput().appendField("🏁 finish");
        this.setPreviousStatement(true, null);
        this.setColour(160);
      }
    };

    Blockly.Blocks['deactivate_action'] = {
      init: function() {
        this.appendDummyInput().appendField("Deactivate");
        this.appendValueInput("INPUT").setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
      }
    };

    Blockly.Blocks['timer_after_finished'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("timer")
          .appendField(new Blockly.FieldDropdown([
            [">", "GT"],
            ["<", "LT"],
            ["=", "EQ"],
            ["≥", "GTE"],
            ["≤", "LTE"]
          ]), "OPERATOR")
          .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "SECONDS")
          .appendField("(s) after");
        this.appendValueInput("EVENT").setCheck(null);
        this.appendDummyInput().appendField("finished");
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setInputsInline(true);
      }
    };

    Blockly.Blocks['timer_conditions'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("Timer")
          .appendField(new Blockly.FieldDropdown([
            [">", "GT"], 
            ["<", "LT"], 
            ["=", "EQ"], 
            ["≥", "GTE"], 
            ["≤", "LTE"]
          ], this.validate), "OPERATOR")
          .appendField(new Blockly.FieldNumber(0, 0, 23, 1), "HOURS").appendField("h")
          .appendField(new Blockly.FieldNumber(0, 0, 59, 1), "MINUTES").appendField("min")
          .appendField(new Blockly.FieldNumber(0, 0, 60, 1), "SECONDS").appendField("s");
        this.setOutput(true, "Boolean");
        this.setColour(100);
      }
    };

    // TOOLBOX
    const toolbox = {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: '📋 Tasks',
          colour: '210',
          contents: [
            { kind: 'block', type: 'all_tasks' },
            { kind: 'block', type: 'tasks_range' },
            { kind: 'block', type: 'tasks_with_tag' },
            { kind: 'block', type: 'task_reference' },
            { kind: 'label', text: '--- Individual Tasks ---' },
            ...TASKS_DATA.map((task, index) => ({
              kind: 'block',
              type: 'task_' + index
            }))
          ]
        },
        {
          kind: 'category',
          name: '🔀 Logic',
          colour: '120',
          contents: [
            { kind: 'block', type: 'when_then_block' },
            { kind: 'block', type: 'finished_block' },
            // { kind: 'block', type: 'scan_qr' },
            { kind: 'block', type: 'timer_conditions' },
            { kind: 'block', type: 'answer_is' },
            // { kind: 'block', type: 'answer_by_team' },
            { kind: 'block', type: 'last_answer_is' },
            { kind: 'block', type: 'timer_after_finished' },
            { kind: 'block', type: 'score_check' },
            { kind: 'block', type: 'date_check' },
            { kind: 'block', type: 'logic_and_or' },
            { kind: 'block', type: 'logic_not' },
            // { kind: 'block', type: 'on_track' },
            // { kind: 'block', type: 'scan_barcode' }
          ]
        },
        {
          kind: 'category',
          name: '⚡ Actions',
          colour: '290',
          contents: [
            { kind: 'block', type: 'show_on_map' },
            { kind: 'block', type: 'show_in_list' },
            { kind: 'block', type: 'open_for_answering' },
             { kind: 'block', type: 'show_tasks_on_playground' },
            { kind: 'block', type: 'finish_action' },
            { kind: 'block', type: 'deactivate_action' }
          ]
        }
      ]
    };

    // INITIALIZE WORKSPACE
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
      trashcan: true,
      scrollbars: true
    });

    // CONVERT BLOCK TO GAME ENGINE FORMAT (non-recursive for when_then)
    function blockToGameEngine(block, skipNext = false) {
      if (!block) return null;

      const type = block.type;

      // Task reference blocks
      if (type.startsWith('task_') && !isNaN(type.split('_')[1])) {
        const taskIndex = parseInt(type.split('_')[1]);
        const task = TASKS_DATA[taskIndex];
        if (task) {
          return {
            type: 'task',
            id: task.id,
            name: task.name,
            points: task.points,
            answerType: task.answerType
          };
        }
      }

      if (type === 'task_reference') {
        const taskNum = block.getFieldValue('TASK_NUM');
        return { type: 'task_' + taskNum };
      }

      if (type === 'tasks_range') {
        return {
          type: 'tasks_range',
          start: block.getFieldValue('FROM'),
          end: block.getFieldValue('TO')
        };
      }

      if (type === 'all_tasks') {
        return { type: 'all_tasks' };
      }

      if (type === 'tasks_with_tag') {
        return {
          type: 'tasks_with_tag',
          tag: block.getFieldValue('TAG')
        };
      }

      // Condition blocks
      if (type === 'scan_qr') {
        return {
          type: 'qr',
          value: 'qrcode1'
        };
      }

      if (type === 'finished_block') {
        const inputBlock = block.getInputTargetBlock('INPUT');
        return {
          type: 'task_finished',
          task: blockToGameEngine(inputBlock)
        };
      }

      if (type === 'answer_is') {
        const taskBlock = block.getInputTargetBlock('TASK');
        const how = block.getFieldValue('ANSWER');
        return {
          type: 'answer_is',
          task: blockToGameEngine(taskBlock),
          isCorrect: how === 'CORRECT' ? true : false
        };
      }

      if (type === 'score_check') {
        const operatorMap = {
          'GT': '>',
          'LT': '<',
          'EQ': '===',
          'GTE': '>=',
          'LTE': '<='
        };
        const operator = block.getFieldValue('OPERATOR');
        return {
          type: 'compare_variable',
          variable: block.getFieldValue('METRIC'),
          op: operatorMap[operator] || operator,
          value: block.getFieldValue('VALUE')
        };
      }

      if (type === 'timer_conditions') {
       const operatorMap = {
    'GT': '>',
    'LT': '<',
    'EQ': '===',
    'GTE': '>=',
    'LTE': '<='
  };
        const hours = block.getFieldValue('HOURS');
        const minutes = block.getFieldValue('MINUTES');
        const seconds = block.getFieldValue('SECONDS');
        if(seconds>60)
        {
          alert("Seconds value cannot be more than 60");
          return null;
        }
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return {
          type: 'timer',
          op: operatorMap[block.getFieldValue('OPERATOR')] || block.getFieldValue('OPERATOR'),
          seconds: totalSeconds
        };
      }

      if (type === 'logic_and_or') {
        const blockA = block.getInputTargetBlock('A');
        const blockB = block.getInputTargetBlock('B');
        const operator = block.getFieldValue('OPERATOR');
        return {
          type: operator.toLowerCase(),
          conditions: [
            blockToGameEngine(blockA),
            blockToGameEngine(blockB)
          ]
        };
      }

      if (type === 'logic_not') {
        const boolBlock = block.getInputTargetBlock('BOOL');
        return {
          type: 'not',
          condition: blockToGameEngine(boolBlock)
        };
      }

      if (type === 'timer_after_finished') {
  const operatorMap = {
    'GT': '>',
    'LT': '<',
    'EQ': '===',
    'GTE': '>=',
    'LTE': '<='
  };
  const taskBlock = block.getInputTargetBlock('EVENT');
  const operator = block.getFieldValue('OPERATOR');
  return {
    type: 'timer_after_finished',
    op: operatorMap[operator] || operator,
    seconds: block.getFieldValue('SECONDS'),
    task: blockToGameEngine(taskBlock)
  };
}

if(type==="last_answer_is")
{
  const taskBlock=block.getInputTargetBlock("TASK");
  const which=block.getFieldValue("WHICH");
  const answer=block.getFieldValue("ANSWER_NUM");
  return{
    type:"last_answer_is",
    task:blockToGameEngine(taskBlock),
    which:which.toLowerCase(),
    answer_num:parseInt(answer)
  };
}

      // Action blocks
      if (type === 'show_on_map') {
        const inputBlock = block.getInputTargetBlock('INPUT');
        return {
          type: 'show_on_playground',
          index: 1,
          task: blockToGameEngine(inputBlock)
        };
      }

      if (type === 'show_tasks_on_playground') {
        const inputBlock = block.getInputTargetBlock('INPUT');
        const playgroundValue = block.getFieldValue('PLAYGROUND');
        return {
          type: 'show_tasks_on_playground',
          playground: parseInt(playgroundValue),
          task: blockToGameEngine(inputBlock)
        };
      }

      if (type === 'show_in_list') {
        const inputBlock = block.getInputTargetBlock('INPUT');
        return {
          type: 'show_in_list',
          task: blockToGameEngine(inputBlock)
        };
      }

      if (type === 'open_for_answering') {
        const inputBlock = block.getInputTargetBlock('INPUT');
        return {
          type: 'activate',
          task: blockToGameEngine(inputBlock)
        };
      }

      if (type === 'finish_action') {
        return { type: 'finish' };
      }

      if (type === 'deactivate_action') {
        const inputBlock = block.getInputTargetBlock('INPUT');
        return {
          type: 'deactivate',
          task: blockToGameEngine(inputBlock)
        };
      }

      // When-then block - NO NEXT PROPERTY
      if (type === 'when_then_block') {
        const conditionBlock = block.getInputTargetBlock('CONDITION');
        const doBlock = block.getInputTargetBlock('DO');
        
        const result = {
          type: 'when_then',
          condition: blockToGameEngine(conditionBlock),
          do: []
        };

        // Collect all actions in the DO block
        let currentDoBlock = doBlock;
        while (currentDoBlock) {
          const action = blockToGameEngine(currentDoBlock);
          if (action) result.do.push(action);
          currentDoBlock = currentDoBlock.getNextBlock();
        }

        return result;
      }

      return null;
    }

    // UPDATE OUTPUT - Each block is added separately to flow array
    function updateCode() {
      const topBlocks = workspace.getTopBlocks(false);
      const flow = [];
      
      // Iterate through all top-level block chains
      topBlocks.forEach(block => {
        let current = block;
        // Walk through the chain of connected blocks
        while (current) {
          const flowItem = blockToGameEngine(current);
          if (flowItem) {
            flow.push(flowItem);
          }
          // Move to the next block in the chain
          current = current.getNextBlock();
        }
      });
      
      const gameJSON = { flow: flow };

      document.getElementById('jsonOutput').textContent = JSON.stringify(gameJSON, null, 2);

      // Generate XML
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xml);
      document.getElementById('xmlOutput').textContent = xmlText;
    }

    workspace.addChangeListener(updateCode);

    // LOAD XML FROM FILE
    function handleXMLLoad(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const xmlText = e.target.result;
          const parser = new DOMParser();
          const xml = parser.parseFromString(xmlText, 'text/xml');
          
          const parserError = xml.getElementsByTagName('parsererror');
          if (parserError.length > 0) {
            alert('❌ Error: Invalid XML file');
            console.error('XML Parse Error:', xml.documentElement.textContent);
            return;
          }
          
          workspace.clear();
          Blockly.Xml.domToWorkspace(xml.documentElement, workspace);
          alert('✅ XML loaded successfully!');
        } catch (error) {
          console.error('Load error:', error);
          alert('❌ Error loading XML: ' + error.message);
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    }

    // COPY FUNCTIONS
    function copyJSON() {
      const text = document.getElementById('jsonOutput').textContent;
      navigator.clipboard.writeText(text).then(() => alert('JSON copied!'));
    }

    function copyXML() {
      const text = document.getElementById('xmlOutput').textContent;
      navigator.clipboard.writeText(text).then(() => alert('XML copied!'));
    }

    function downloadJSON() {
      const text = document.getElementById('jsonOutput').textContent;
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'game-logic.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>`;

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        display: "block",
        margin: 0,
        padding: 0,
      }}
      title="Blockly Editor"
    />
  );
};

export default BlocklyEditor;
