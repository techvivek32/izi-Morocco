/**
 * Extract tasks from a marker JSON rules array.
 * Returns an array of task objects (or an empty array) extracted from rules.
 * Expected task shape examples: { from: 1, to: null, isNext: true } or { from:1, to:null, tag: 'x' }
 */
export function markerGetter(markerJson, allNextIds = []) {
    // console.log('Marker JSON:', markerJson);
    const rules = markerJson?.rules;
    if (!Array.isArray(rules) || rules.length === 0) return [];

    // Collect tasks (processRule may return a single task object, boolean, or null)
    const tasks = rules.flatMap((rule) => {
        const result = processRule(rule, allNextIds);
        // If result is an array, include its members; if single object, include it; ignore falsy values
        if (Array.isArray(result)) return result.filter(Boolean);
        return result ? [result] : [];
    });

    return tasks;
}

function findRuleByNextId(rule, targetNextId) {
    if (!rule || typeof rule !== "object") return null;

    //If current rule's id itself matches the targetNextId → return it
    if (rule.id === targetNextId) {
        return rule;
    }

    //Search recursively inside rule.next
    if (rule.next && typeof rule.next === "object") {
        const foundInNext = findRuleByNextId(rule.next, targetNextId);
        if (foundInNext) return foundInNext;
    }

    //Search recursively inside rule.inputs
    if (rule.inputs && typeof rule.inputs === "object") {
        for (const key in rule.inputs) {
            const inputObj = rule.inputs[key];
            if (inputObj && typeof inputObj === "object") {
                const foundInInput = findRuleByNextId(inputObj, targetNextId);
                if (foundInInput) return foundInInput;
            }
        }
    }

    // If nothing found, return null
    return null;
}

// 🔍 Searches across all top-level rules
export function findRuleInAll(jsonData, targetNextId) {
    if (!jsonData || !Array.isArray(jsonData.rules)) return null;

    for (const rule of jsonData.rules) {
        const found = findRuleByNextId(rule, targetNextId);
        if (found) return found; // ✅ Return the actual rule matching that next.id
    }

    return null;
}
// Recursive helper to process a rule block. Returns:
// - a task object (e.g. {from, to, ...}),
// - a boolean for simple condition checks (like scan_qr), or
// - null when nothing should be returned.
const processRule = (rule, allNextIds = []) => {
    if (!rule || typeof rule.type !== 'string') return null;
    console.log('Processing rule:', rule);
    switch (rule.type) {
        case 'when_then_block': {
            const condition = rule.inputs?.CONDITION;
            const doBlock = rule.inputs?.DO;
            var evaluatedCondition = evaluateCondition(condition);
            var isThereAnyNext = isNext(rule.next);
            // return { evaluatedCondition, isThereAnyNext };
            console.log('Evaluated Condition:', evaluatedCondition, 'Next:', isThereAnyNext);
            if (isThereAnyNext.isNext && isThereAnyNext.nextId !== undefined) {
                allNextIds.push(isThereAnyNext.nextId);
            }

            if (evaluatedCondition.conditionMet) {
                var processedTasks = processRule(doBlock);
                console.log('Processed Tasks:', processedTasks);
                var isThereAnyChildNext = isNext(rule.next);
                if (processedTasks.isNext && processedTasks.nextId !== undefined) {
                    allNextIds.push(processedTasks.nextId);
                    return { ...processedTasks, allNextIds }
                }
                else if (isThereAnyChildNext.isNext && isThereAnyChildNext.nextId !== undefined) {
                    allNextIds.push(isThereAnyChildNext.nextId);
                    return { ...processedTasks, ...(isThereAnyChildNext), allNextIds };
                }
                // return processedTasks;
            }
            // else if (evaluatedCondition.isNext && evaluatedCondition.nextId !== "") {
            //     console.log('Evaluated Condition:', evaluatedCondition, 'Next:', isThereAnyNext);
            //     return evaluatedCondition
            // }
            // else if (isThereAnyNext.isNext && isThereAnyNext.nextId !== "") {
            //     console.log('Evaluated Condition:', evaluatedCondition, 'Next:', isThereAnyNext);
            //     return isThereAnyNext;
            // }
            console.log('Evaluated Condition:', evaluatedCondition, 'Next:', isThereAnyNext);
            return { ...evaluatedCondition, ...isThereAnyNext };
        }

        case 'show_on_map':
        case 'show_in_list':
        case 'open_for_answering': {
            console.log('Processing show_on_map or similar block:', rule);
            var processedTasks = processRule(rule.inputs?.INPUT);
            var isThereAnyNext = isNext(rule.next);
            if (processedTasks.isNext && processedTasks.nextId !== undefined) {
                return processedTasks
            }
            else if (isThereAnyNext.isNext && isThereAnyNext.nextId !== undefined) {
                return { ...processedTasks, ...isThereAnyNext };
            }
            else return processedTasks
        }

        case 'tasks_with_tag': {
            // Final actionable task block
            return { tag: (rule.fields?.TAG || ''), ...isNext(rule.next) };
        }

        case 'all_tasks': {
            const from = rule.fields?.FROM ?? 1;
            const to = rule.fields?.TO ?? null;
            return { ...{ from, to }, ...isNext(rule.next) };
        }
        case 'tasks_range': {
            const from = rule.fields?.FROM ?? 1;
            const to = rule.fields?.TO ?? null;
            var tasks = { from, to };
            var isThereAnyNext = isNext(rule.next);
            console.log('Tasks Range:', tasks, 'Next:', isThereAnyNext);
            if (isThereAnyNext.isNext && isThereAnyNext.nextId !== undefined) {
                return { ...tasks, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
            }
            return { ...tasks, isNext: isThereAnyNext.isNext };
        }

        default:
            console.log('Unknown block type:', rule.type);
            return null;
    }
};

// small helper kept for backwards-compatibility if needed elsewhere
const isNext = (next) => {
    if (next && typeof next === 'object' && Object.keys(next).length > 0) {
        return { isNext: true, nextId: next.id };
    }
    else {
        return { isNext: false };
    }
}
// Evaluate condition blocks (currently only handles scan_qr)
const evaluateCondition = (node) => {
    if (!node || !node.type) return false;

    switch (node.type) {
        case 'logic_and_or': {
            const a = evaluateCondition(node.inputs?.A);
            const b = evaluateCondition(node.inputs?.B);
            // console.log('Evaluating logic_and_or:', a, b, node.fields?.OPERATOR);
            const logic_and_or_condition = node.fields?.OPERATOR === 'AND' ? (a.conditionMet && b.conditionMet) : (a.conditionMet || b.conditionMet);
            var isThereAnyNext = isNext(node.next);
            if (logic_and_or_condition) {
                if (a.isNext || b.isNext)
                    return { conditionMet: true, nextId: a.isNext ? a.nextId : b.nextId, isNext: true };
                else {
                    return { conditionMet: true, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
                }
            }
            else {
                if (a.isNext || b.isNext)
                    return { conditionMet: false, nextId: a.isNext ? a.nextId : b.nextId, isNext: true };
                else {
                    return { conditionMet: false, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
                }
            }
        }

        case 'logic_not':
            var isThereAnyNext = isNext(node.next);
            var evaluatedCondition = evaluateCondition(node.inputs?.BOOL);
            console.log('Evaluating logic_not:', evaluatedCondition, isThereAnyNext);
            if (evaluatedCondition.conditionMet) {
                return { conditionMet: false, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
            }
            return { conditionMet: true, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };

        case 'answer_is':
            var isThereAnyNext = isNext(node.next);
            return { conditionMet: node.fields?.ANSWER === 'CORRECT', nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
        // return node.fields?.ANSWER === 'CORRECT';

        case 'score_check':
            return (node.fields?.METRIC === 'SCORE') && (node.fields?.VALUE > 0);

        case 'last_answer_is':
            // Example: handle 'first/last' answer logic
            return node.fields?.CHECK === 'TRUE';

        case 'scan_qr':
            //     // Returns boolean representing the QR check
            var isThereAnyNext = isNext(node.next);
            return { conditionMet: true, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
        default:
            return false;
    }
};






























// export function markerGetter(markerJson) {
//     const rules = markerJson?.rules;
//     if (!Array.isArray(rules) || rules.length === 0) return [];

//     const tasks = rules.flatMap((rule) => {
//         const result = processRule(rule);
//         if (Array.isArray(result)) return result.filter(Boolean);
//         return result ? [result] : [];
//     });

//     return tasks;
// }

// function findRuleByNextId(rule, targetNextId) {
//     if (!rule || typeof rule !== "object") return null;

//     if (rule.id === targetNextId) {
//         return rule;
//     }

//     if (rule.next && typeof rule.next === "object") {
//         const foundInNext = findRuleByNextId(rule.next, targetNextId);
//         if (foundInNext) return foundInNext;
//     }

//     if (rule.inputs && typeof rule.inputs === "object") {
//         for (const key in rule.inputs) {
//             const inputObj = rule.inputs[key];
//             if (inputObj && typeof inputObj === "object") {
//                 const foundInInput = findRuleByNextId(inputObj, targetNextId);
//                 if (foundInInput) return foundInInput;
//             }
//         }
//     }

//     return null;
// }

// export function findRuleInAll(jsonData, targetNextId) {
//     if (!jsonData || !Array.isArray(jsonData.rules)) return null;

//     for (const rule of jsonData.rules) {
//         const found = findRuleByNextId(rule, targetNextId);
//         if (found) return found;
//     }

//     return null;
// }

// const processRule = (rule, parentNextId = null) => {
//     if (!rule || typeof rule.type !== 'string') return null;
//     console.log('Processing rule:', rule.id, 'type:', rule.type, 'parentNextId:', parentNextId);

//     switch (rule.type) {
//         case 'when_then_block': {
//             const condition = rule.inputs?.CONDITION;
//             const doBlock = rule.inputs?.DO;
//             const evaluatedCondition = evaluateCondition(condition);
//             const parentNext = isNext(rule.next);

//             console.log('when_then_block - Condition met:', evaluatedCondition.conditionMet, 'Parent next:', parentNext);

//             if (evaluatedCondition.conditionMet) {
//                 // Pass parent's next to child processing
//                 const processedTasks = processRule(doBlock, parentNext.nextId || parentNextId);
//                 console.log('when_then_block - Processed tasks from DO:', processedTasks);

//                 // Return the processed tasks - they already include all next IDs
//                 return processedTasks;
//             }

//             // Condition not met, return parent's next
//             return { ...evaluatedCondition, ...parentNext };
//         }

//         case 'show_on_map':
//         case 'show_in_list':
//         case 'open_for_answering': {
//             console.log(`${rule.type} - Processing, parentNextId:`, parentNextId);
//             const processedTasks = processRule(rule.inputs?.INPUT);
//             const currentNext = isNext(rule.next);

//             console.log(`${rule.type} - Processed tasks:`, processedTasks, 'Current next:', currentNext, 'Parent next:', parentNextId);

//             // KEY FIX: Collect all next IDs in priority order
//             const nextIds = [];

//             // Priority 1: Child's next (from processedTasks)
//             if (processedTasks?.isNext && processedTasks.nextId) {
//                 nextIds.push(processedTasks.nextId);
//             }

//             // Priority 2: Current block's next
//             if (currentNext.isNext && currentNext.nextId) {
//                 nextIds.push(currentNext.nextId);
//             }

//             // Priority 3: Parent's next
//             if (parentNextId) {
//                 nextIds.push(parentNextId);
//             }

//             console.log(`${rule.type} - All collected nextIds:`, nextIds);

//             // Return with all nextIds for sequential processing
//             return {
//                 ...processedTasks,
//                 nextId: nextIds[0] || null, // Primary next
//                 allNextIds: nextIds, // All next IDs in sequence
//                 isNext: nextIds.length > 0,
//                 currentIndex: 0 // Track which next we're on
//             };
//         }

//         case 'tasks_with_tag': {
//             const result = { tag: (rule.fields?.TAG || ''), ...isNext(rule.next) };
//             if (parentNextId && !result.nextId) {
//                 result.nextId = parentNextId;
//                 result.isNext = true;
//             }
//             return result;
//         }

//         case 'all_tasks': {
//             const from = rule.fields?.FROM ?? 1;
//             const to = rule.fields?.TO ?? null;
//             const result = { from, to, ...isNext(rule.next) };
//             if (parentNextId && !result.nextId) {
//                 result.nextId = parentNextId;
//                 result.isNext = true;
//             }
//             return result;
//         }

//         case 'tasks_range': {
//             const from = rule.fields?.FROM ?? 1;
//             const to = rule.fields?.TO ?? null;
//             const currentNext = isNext(rule.next);

//             console.log('tasks_range - From:', from, 'To:', to, 'Current next:', currentNext, 'Parent next:', parentNextId);

//             const result = { from, to };

//             // Collect next IDs
//             if (currentNext.isNext && currentNext.nextId) {
//                 result.nextId = currentNext.nextId;
//                 result.isNext = true;
//             } else if (parentNextId) {
//                 result.nextId = parentNextId;
//                 result.isNext = true;
//             } else {
//                 result.isNext = false;
//             }

//             return result;
//         }

//         default:
//             console.log('Unknown block type:', rule.type);
//             return null;
//     }
// };

// const isNext = (next) => {
//     if (next && typeof next === 'object' && Object.keys(next).length > 0) {
//         return { isNext: true, nextId: next.id };
//     } else {
//         return { isNext: false };
//     }
// };

// const evaluateCondition = (node) => {
//     if (!node || !node.type) return false;

//     switch (node.type) {
//         case 'logic_and_or': {
//             const a = evaluateCondition(node.inputs?.A);
//             const b = evaluateCondition(node.inputs?.B);
//             const logic_and_or_condition = node.fields?.OPERATOR === 'AND'
//                 ? (a.conditionMet && b.conditionMet)
//                 : (a.conditionMet || b.conditionMet);
//             var isThereAnyNext = isNext(node.next);

//             if (logic_and_or_condition) {
//                 if (a.isNext || b.isNext) {
//                     return { conditionMet: true, nextId: a.isNext ? a.nextId : b.nextId, isNext: true };
//                 } else {
//                     return { conditionMet: true, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
//                 }
//             } else {
//                 if (a.isNext || b.isNext) {
//                     return { conditionMet: false, nextId: a.isNext ? a.nextId : b.nextId, isNext: true };
//                 } else {
//                     return { conditionMet: false, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
//                 }
//             }
//         }

//         case 'logic_not': {
//             var isThereAnyNext = isNext(node.next);
//             var evaluatedCondition = evaluateCondition(node.inputs?.BOOL);
//             console.log('Evaluating logic_not:', evaluatedCondition, isThereAnyNext);

//             if (evaluatedCondition.conditionMet) {
//                 return { conditionMet: false, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
//             }
//             return { conditionMet: true, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
//         }

//         case 'answer_is': {
//             var isThereAnyNext = isNext(node.next);
//             return {
//                 conditionMet: node.fields?.ANSWER === 'CORRECT',
//                 nextId: isThereAnyNext.nextId,
//                 isNext: isThereAnyNext.isNext
//             };
//         }

//         case 'score_check':
//             return (node.fields?.METRIC === 'SCORE') && (node.fields?.VALUE > 0);

//         case 'last_answer_is':
//             return node.fields?.CHECK === 'TRUE';

//         case 'scan_qr': {
//             var isThereAnyNext = isNext(node.next);
//             return { conditionMet: true, nextId: isThereAnyNext.nextId, isNext: isThereAnyNext.isNext };
//         }

//         default:
//             return false;
//     }
// };


// /**
//  * Process a specific rule by ID while maintaining full JSON context
//  * This ensures parent's next blocks are always available
//  */
// export function markerGetterByRuleId(markerJson, startRuleId) {
//     if (!startRuleId) {
//         // If no specific rule, process all rules normally
//         return markerGetter(markerJson);
//     }

//     // Find the specific rule in the full JSON
//     const targetRule = findRuleInAll(markerJson, startRuleId);

//     if (!targetRule) {
//         console.warn(`Rule with ID ${startRuleId} not found`);
//         return [];
//     }

//     // Process only this rule but keep full JSON context in memory
//     const result = processRule(targetRule);

//     if (Array.isArray(result)) {
//         return result.filter(Boolean);
//     }
//     return result ? [result] : [];
// }


































// export const markerGetter = markerJson => {
//   console.log(markerJson);
//   const task_given_by_switch= markerJson?.rules?.map(rule => {
//     console.log(rule);
//     var tasks=markerSwitcher(rule.type, markerJson);
//     return tasks;
//   });
//   return task_given_by_switch;
// };

// const markerSwitcher = (type, markerJson) => {
//   console.log('type', type);
//   switch (type) {
//     case 'when_then_block':
//       var condition = markerJson?.rules[0]?.inputs?.CONDITION;
//       if (condition.type != '' && condition.type != null) {
//         if (markerSwitcher(condition.type, condition)) {
//           console.log('condition met', markerJson);
//           var dos = markerJson?.rules[0]?.inputs?.DO;
//           let tasks= markerSwitcher(dos.type, dos.inputs.INPUT);
//           console.log('tasks', tasks);
//           return tasks;
//         } else {
//           console.log('Wrong QR Code');
//         }
//       }
//       return 'when_then_block';
//     case 'scan_qr':
//       console.log('QR_CHECK', markerJson.fields.QR_CHECK);
//       return markerJson.fields.QR_CHECK;
//     case 'show_on_map':
//       return markerSwitcher(markerJson?.type, markerJson);
//     //   return 'show_on_map';
//     case 'all_tasks':
//       console.log('AllTasks');
//       return { from: 1, to: null };
//     default:
//       return 'default';
//   }
// };