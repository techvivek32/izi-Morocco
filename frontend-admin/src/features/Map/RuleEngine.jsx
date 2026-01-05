import React, { useEffect, useState } from "react";
import { data2, questionsFinished } from "./utils/data2";
import { analyzeDataRule, getTimerAfterFinished } from "./utils/test2";
import TaskList from "./components/TaskList";

const RuleEngine = () => {
  const [tasks, setTasks] = useState(
    questionsFinished[0].response.questions || []
  );
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerConditions, setTimerConditions] = useState([]);

  useEffect(() => {
    const timeSetter = getTimerAfterFinished(data2);
    setTimerConditions(timeSetter);
    console.log({ timeSetter });
  }, [data2]);

  const handleTasksChange = (nextTasks) => {
    setTasks(nextTasks);
    // console.log("Updated tasks:", nextTasks);
    const initial =
      analyzeDataRule(data2, nextTasks, { score, timer }, timerConditions) ||
      [];
    console.log("Initial tasks from rules:", initial);
  };

  const handleScoreChange = (e) => {
    const val = Number(e.target.value || 0);
    setScore(val);
    // propagate score into tasks objects so child components can access it
    setTasks((prev) => prev.map((t) => ({ ...t, score: val })));
    // optionally re-run rule analysis if needed
    const initial =
      analyzeDataRule(data2, tasks, { score: val, timer }, timerConditions) ||
      [];
    console.log("Score changed to", val, "— recalculated rules:", initial);
  };

  const handleTimerChange = (e) => {
    const val = Number(e.target.value || 0);
    setTimer(val);
    // propagate score into tasks objects so child components can access it
    // setTasks((prev) => prev.map((t) => ({ ...t, score: val })));
    // optionally re-run rule analysis if needed
    const initial =
      analyzeDataRule(data2, tasks, { score, timer: val }, timerConditions) ||
      [];
    console.log("Score changed to", val, "— recalculated rules:", initial);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">Score:</label>
        <input
          type="number"
          value={score}
          onChange={handleScoreChange}
          className="border rounded px-2 py-1 w-28"
        />
        <input
          type="number"
          value={timer}
          onChange={handleTimerChange}
          className="border rounded px-2 py-1 w-28"
        />
      </div>
      {/* {console.log("Rendering tasks:", tasks)} */}
      <TaskList tasks={tasks} onChange={handleTasksChange} />
    </div>
  );
};

export default RuleEngine;
