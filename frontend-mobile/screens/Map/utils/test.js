let questions = [];
let SCORE = 0;
export const analyzeDataRule = (markerJson, questionFromMain, extras = {}) => {
  const rules = markerJson?.flow || [];
  console.log("questionFromMain", questionFromMain);
  questions = questionFromMain;
  SCORE = extras?.score;
  // console.log(rules.length)
  if (!Array.isArray(rules) || rules.length === 0) return [{ finish: true }];

  let processtheWholeData = rules
    .flatMap(rule => {
      // console.log("rule", rule);
      let finalReturned = processRule(rule, rules.length);
      // console.log("finalReturned", finalReturned);
      return finalReturned;
    })
    .filter(item => item !== undefined);
  console.log('processtheWholeData', processtheWholeData);
  // if (processtheWholeData.length === 0) return [{ finish: true }];
  return processtheWholeData;
};

const processRule = (rule, n) => {
  let whichCase = rule?.type;
  switch (whichCase) {
    case 'show_on_playground': {
      let task = processRule(rule?.task, n);
      // console.log("Processing 'show_on_playground' rule:", task);
      return task;
    }

    case 'tasks_with_tag': {
      // console.log("Processing 'tasks_with_tag' rule");
      return { showTag: true, tagName: rule?.tag };
    }

    case 'all_tasks': {
      return { showAll: true, idsToShow: getFinishedButNotDisplayedTaskIds() };
    }

    case 'task': {
      if (getUnDisplayedTaskFromID(rule?.id))
        return { showTask: true, idToShow: rule?.id };
      break;
    }

    // case "task_finished": {
    //     let task = rule?.task;
    //     return evaluateTasks(task);
    // }

    case 'when_then':
      {
        let condition = evaluateCondition(rule?.condition);
        console.log('Condition evaluated to:', { rule, condition });
        if (condition) {
          let doThen = rule?.do;
          // console.log("'do' actions to process:", doThen);
          let processedDoThen = doThen.flatMap(dos => processRule(dos, n));
          console.log("Processed 'do' actions:", processedDoThen);
          return processedDoThen;
        }
      }
      break;

    case 'activate': {
      if (
        Object.keys(rule).includes('task') &&
        rule?.task != null &&
        checkIfTaskFinished(rule?.task?.id) === false
      ) {
        return { activate: true, taskId: rule?.task?.id };
      }
      break;
    }

    case 'deactivate': {
      let task = rule?.task;
      switch (task?.type) {
        case 'task': {
          return { deactivate: true, taskId: [task?.id] };
        }

        case 'all_tasks': {
          return { deactivateAll: true };
        }

        case 'tasks_range': {
          return { deactivate: true, taskId: getRange(task?.start, task?.end) };
        }
      }
      break;
    }

    case 'finish': {
      return { finish: true };
    }
  }
};

const getRange = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const evaluateCondition = condition => {
  let conditionType = condition?.type;
  switch (conditionType) {
    case 'and': {
      let conditions = condition?.conditions || [];
      let results = conditions.map(cond => evaluateCondition(cond));
      return results.every(res => res === true);
    }

    case 'or': {
      let conditions = condition?.conditions || [];
      let results = conditions.map(cond => evaluateCondition(cond));
      return results.some(res => res === true);
    }

    case 'not': {
      let cond = condition?.condition;
      return !evaluateCondition(cond);
    }

    case 'task_finished': {
      let task = condition.task;
      return evaluateTasks(task);
    }

    case 'answer_is': {
      return checkIfAnswerIsCorrect(condition.task.id, condition?.isCorrect);
    }
    case 'compare_variable': {
      const { variable, op, value } = condition;

      // assuming your local variables are accessible globally or via an object
      const localVars = { SCORE }; // you can add more vars here
      const left = localVars[variable];

      switch (op) {
        case '>':
          return left > value;
        case '<':
          return left < value;
        case '>=':
          return left >= value;
        case '<=':
          return left <= value;
        case '==':
          return left == value;
        case '===':
          return left === value;
        case '!=':
          return left != value;
        case '!==':
          return left !== value;
        default:
          throw new Error(`Unsupported operator: ${op}`);
      }
    }

    default:
      throw new Error(
        `Unknown condition type: ${conditionType}, rule: ${JSON.stringify(
          condition,
        )}`,
      );
  }
};

const evaluateTasks = taskList => {
  // console.log("Evaluating taskList:", taskList);
  let type = taskList?.type;

  switch (type) {
    case 'task': {
      return checkIfTaskFinished(taskList?.id);
    }
    case 'all_tasks': {
      let allTasks = questions.map(
        q => q.isFinished === true && q.isDisplayed === true,
      );
      // console.log("allTasks evaluation:", allTasks.every(res => res === true));
      // console.log(allTasks.every(res => res === true))
      return allTasks.every(res => res === true);
    }
  }
};

const checkIfAnswerIsCorrect = (taskId, isCorrect) => {
  const finishedTasks = questions.find(q => {
    return (
      q.question._id?.toString() === taskId &&
      q.isFinished === true &&
      q.isCorrect === isCorrect
    );
  });
  return finishedTasks !== undefined;
};

const checkIfTaskFinished = taskId => {
  const finishedTask = questions.find(q => {
    return q.question._id?.toString() === taskId && q.isFinished === true;
  });
  return finishedTask !== undefined;
};

// Returns full task objects that are finished (isFinished && isCorrect)
// and currently not displayed (isDisplayed === false)
const getFinishedButNotDisplayedTasks = () => {
  return questions
    .filter(q => checkIfTaskFinished(q.question._id) && q.isDisplayed === false)
    .map(q => ({ _id: q.question._id, ...q }));
};

// Returns only the IDs of tasks that are finished and not displayed
const getFinishedButNotDisplayedTaskIds = () => {
  const toPass = questions
    .filter(q => q.isDisplayed === false)
    .map(q => q.question._id);
  console.log('Finished but not displayed task IDs:', toPass);
  return toPass;
};

const getUnDisplayedTaskFromID = id => {
  // console.log("Searching for undisplayed task with ID:", id,{questions});
  return questions.find(
    q => q.isDisplayed === false && q.question._id?.toString() === id,
  )?.question._id;
};
export const getQuestionsByTags = (selectedTags, questions) => {
  // Extract only the tag names to search
  const tagNames = selectedTags.map(tag => tag.tagName?.toLowerCase());

  // Filter questions that have matching tags
  const filteredQuestions = questions.filter(q => {
    const questionTags = q.question.tags.map(t => t.name?.toLowerCase());
    return tagNames.some(tagName => questionTags.includes(tagName) && !q.isDisplayed);
  });

  // Map to simplified structure
  return filteredQuestions;
};
