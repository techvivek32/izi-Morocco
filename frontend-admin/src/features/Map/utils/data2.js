
// export const data2 = {
//     "flow": [
//         {
//             "type": "show_on_playground",
//             "index": 1,
//             "task": {
//                 "type": "tasks_with_tag",
//                 "tag": "find"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "and",
//                 "conditions": [
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "1",
//                             "name": "Basic arithmetic question",
//                             "points": 5,
//                             "answerType": "multiple"
//                         }
//                     },
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "2",
//                             "name": "Why are you crazy?",
//                             "points": 100,
//                             "answerType": "number"
//                         }
//                     }
//                 ]
//             },
//             "do": [
//                 {
//                     "type": "activate",
//                     "task": {
//                         "type": "task",
//                         "id": "3",
//                         "name": "What is 789?",
//                         "points": 40,
//                         "answerType": "number"
//                     }
//                 },
//                 // {
//                 //     "type": "activate",
//                 //     "task": {
//                 //         "type": "task",
//                 //         "id": "68e8d8d8e84ce5a65c249d7a",
//                 //         "name": "What is 789?",
//                 //         "points": 40,
//                 //         "answerType": "number"
//                 //     }
//                 // }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "task",
//                     "id": "4",
//                     "name": "Hii",
//                     "points": 10,
//                     "answerType": "puzzle"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "activate",
//                     "task": {
//                         "type": "task",
//                         "id": "5",
//                         "name": "testt2",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 }
//             ]
//         },
//     ]
// }


// export const data2 = {
//     "flow": [
//         {
//             "type": "show_on_playground",
//             "index": 1,
//             "task": {
//                 "type": "tasks_with_tag",
//                 "tag": "find"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "and",
//                 "conditions": [
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "68d6605d0204a8c78c6fcbfb",
//                             "name": "Basic arithmetic question",
//                             "points": 5,
//                             "answerType": "multiple"
//                         }
//                     },
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "68da7951a59eba4a41e82ab0",
//                             "name": "Why are you crazy?",
//                             "points": 100,
//                             "answerType": "number"
//                         }
//                     }
//                 ]
//             },
//             "do": [
//                 {
//                     "type": "activate",
//                     "task": {
//                         "type": "task",
//                         "id": "68e8d8d8e84ce5a65c249d7a",
//                         "name": "What is 789?",
//                         "points": 40,
//                         "answerType": "number"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "task",
//                     "id": "68e8d60ee84ce5a65c249d1c",
//                     "name": "Hii",
//                     "points": 10,
//                     "answerType": "puzzle"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "activate",
//                     "task": {
//                         "type": "task",
//                         "id": "68e8abbb4f895bea49926f40",
//                         "name": "testt2",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "68e8abbb4f895bea49926f40",
//                             "name": "testt2",
//                             "points": 5,
//                             "answerType": "multiple"
//                         }
//                     },
//                     "do": [
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "all_tasks"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "finish"
//                 }
//             ]
//         }
//     ]
// }



// export const data2 = {
//     "flow": [
//         {
//             "type": "show_on_playground",
//             "index": 1,
//             "task": {
//                 "type": "task",
//                 "id": "1",
//                 "name": "1",
//                 "points": 5,
//                 "answerType": "multiple"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "task",
//                     "id": "1",
//                     "name": "1",
//                     "points": 5,
//                     "answerType": "multiple"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "2",
//                         "name": "2",
//                         "points": 100,
//                         "answerType": "number"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "3",
//                         "name": "3",
//                         "points": 40,
//                         "answerType": "number"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "4",
//                         "name": "4",
//                         "points": 10,
//                         "answerType": "puzzle"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "5",
//                         "name": "5",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "6",
//                         "name": "6",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "7",
//                         "name": "7",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "8",
//                         "name": "8",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "9",
//                         "name": "9",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "all_tasks"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "finish"
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "compare_variable",
//                 "variable": "SCORE",
//                 "op": ">=",
//                 "value": 10
//             },
//             "do": [
//                 {
//                     "type": "deactivate",
//                     "task": {
//                         "type": "all_tasks"
//                     }
//                 }
//             ]
//         },
//     ]
// }

// export const data2 = {
//     "flow": [
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "answer_is",
//                 "task": {
//                     "type": "task",
//                     "id": "1",
//                     "name": "1",
//                     "points": 5,
//                     "answerType": "multiple"
//                 },
//                 "isCorrect": true
//             },
//             "do": []
//         }
//     ]
// }

// export const data2 = {
//     "flow": [
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "compare_variable",
//                 "variable": "SCORE",
//                 "op": "===",
//                 "value": 5
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "3",
//                         "name": "3",
//                         "points": 40,
//                         "answerType": "number"
//                     }
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "3",
//                             "name": "3",
//                             "points": 40,
//                             "answerType": "number"
//                         }
//                     },
//                     "do": [
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "task",
//                                 "id": "4",
//                                 "name": "4",
//                                 "points": 10,
//                                 "answerType": "puzzle"
//                             }
//                         },
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "task",
//                                 "id": "5",
//                                 "name": "5",
//                                 "points": 5,
//                                 "answerType": "multiple"
//                             }
//                         },
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "task",
//                                 "id": "6",
//                                 "name": "6",
//                                 "points": 5,
//                                 "answerType": "multiple"
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "and",
//                         "conditions": [
//                             {
//                                 "type": "task_finished",
//                                 "task": {
//                                     "type": "task",
//                                     "id": "4",
//                                     "name": "4",
//                                     "points": 10,
//                                     "answerType": "puzzle"
//                                 }
//                             },
//                             {
//                                 "type": "and",
//                                 "conditions": [
//                                     {
//                                         "type": "task_finished",
//                                         "task": {
//                                             "type": "task",
//                                             "id": "5",
//                                             "name": "5",
//                                             "points": 5,
//                                             "answerType": "multiple"
//                                         }
//                                     },
//                                     {
//                                         "type": "task_finished",
//                                         "task": {
//                                             "type": "task",
//                                             "id": "6",
//                                             "name": "6",
//                                             "points": 5,
//                                             "answerType": "multiple"
//                                         }
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     "do": [
//                         {
//                             "type": "deactivate",
//                             "task": {
//                                 "type": "tasks_range",
//                                 "start": 1,
//                                 "end": 6
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "activate",
//             "task": {
//                 "type": "task",
//                 "id": "1",
//                 "name": "1",
//                 "points": 5,
//                 "answerType": "multiple"
//             }
//         },
//         {
//             "type": "show_on_playground",
//             "index": 1,
//             "task": {
//                 "type": "task",
//                 "id": "2",
//                 "name": "2",
//                 "points": 100,
//                 "answerType": "number"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "compare_variable",
//                 "variable": "SCORE",
//                 "op": "===",
//                 "value": 35
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "7",
//                         "name": "7",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "7",
//                             "name": "7",
//                             "points": 5,
//                             "answerType": "multiple"
//                         }
//                     },
//                     "do": [
//                         {
//                             "type": "activate",
//                             "task": {
//                                 "type": "task",
//                                 "id": "8",
//                                 "name": "8",
//                                 "points": 5,
//                                 "answerType": "multiple"
//                             }
//                         },
//                         {
//                             "type": "when_then",
//                             "condition": {
//                                 "type": "answer_is",
//                                 "task": {
//                                     "type": "task",
//                                     "id": "8",
//                                     "name": "8",
//                                     "points": 5,
//                                     "answerType": "multiple"
//                                 },
//                                 "isCorrect": true
//                             },
//                             "do": [
//                                 {
//                                     "type": "finish"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }

// export const data2 = {
//     "flow": [
//         {
//             "type": "activate",
//             "task": {
//                 "type": "task",
//                 "id": "69009ead7b6657713f9361fb",
//                 "name": "1",
//                 "points": 5,
//                 "answerType": "multiple"
//             }
//         },
//         {
//             "type": "show_on_playground",
//             "index": 1,
//             "task": {
//                 "type": "task",
//                 "id": "68ecc9d7128b9cbfa7489be9",
//                 "name": "2",
//                 "points": 100,
//                 "answerType": "number"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "compare_variable",
//                 "variable": "SCORE",
//                 "op": ">=",
//                 "value": 30
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "68ec9877128b9cbfa748993b",
//                         "name": "3",
//                         "points": 40,
//                         "answerType": "number"
//                     }
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "68ec9877128b9cbfa748993b",
//                             "name": "3",
//                             "points": 40,
//                             "answerType": "number"
//                         }
//                     },
//                     "do": [
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "task",
//                                 "id": "68e8d8d8e84ce5a65c249d7a",
//                                 "name": "4",
//                                 "points": 10,
//                                 "answerType": "puzzle"
//                             }
//                         },
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "task",
//                                 "id": "68e7bb7cd7f6441d57892131",
//                                 "name": "5",
//                                 "points": 5,
//                                 "answerType": "multiple"
//                             }
//                         },
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "task",
//                                 "id": "68e7577995ee8b2083298531",
//                                 "name": "6",
//                                 "points": 5,
//                                 "answerType": "multiple"
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "and",
//                         "conditions": [
//                             {
//                                 "type": "answer_is",
//                                 "task": {
//                                     "type": "task",
//                                     "id": "68e8d8d8e84ce5a65c249d7a",
//                                     "name": "4",
//                                     "points": 10,
//                                     "answerType": "puzzle"
//                                 },
//                                 "isCorrect": true
//                             },
//                             {
//                                 "type": "and",
//                                 "conditions": [
//                                     {
//                                         "type": "answer_is",
//                                         "task": {
//                                             "type": "task",
//                                             "id": "68e7bb7cd7f6441d57892131",
//                                             "name": "5",
//                                             "points": 5,
//                                             "answerType": "multiple"
//                                         },
//                                         "isCorrect": true
//                                     },
//                                     {
//                                         "type": "answer_is",
//                                         "task": {
//                                             "type": "task",
//                                             "id": "68e7577995ee8b2083298531",
//                                             "name": "6",
//                                             "points": 5,
//                                             "answerType": "multiple"
//                                         },
//                                         "isCorrect": true
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     "do": [
//                         {
//                             "type": "deactivate",
//                             "task": {
//                                 "type": "and",
//                                 "conditions": [
//                                     {
//                                         "type": "tasks_range",
//                                         "start": 1,
//                                         "end": 1
//                                     },
//                                     {
//                                         "type": "tasks_range",
//                                         "start": 3,
//                                         "end": 6
//                                     }
//                                 ]
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "and",
//                 "conditions": [
//                     {
//                         "type": "compare_variable",
//                         "variable": "SCORE",
//                         "op": "===",
//                         "value": 96
//                     },
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "68ecc9d7128b9cbfa7489be9",
//                             "name": "2",
//                             "points": 100,
//                             "answerType": "number"
//                         }
//                     }
//                 ]
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "task",
//                         "id": "68e7561895ee8b208329850d",
//                         "name": "7",
//                         "points": 5,
//                         "answerType": "multiple"
//                     }
//                 },
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "task",
//                             "id": "68e7561895ee8b208329850d",
//                             "name": "7",
//                             "points": 5,
//                             "answerType": "multiple"
//                         }
//                     },
//                     "do": [
//                         {
//                             "type": "activate",
//                             "task": {
//                                 "type": "task",
//                                 "id": "68e7546995ee8b20832984e9",
//                                 "name": "8",
//                                 "points": 5,
//                                 "answerType": "multiple"
//                             }
//                         },
//                         {
//                             "type": "when_then",
//                             "condition": {
//                                 "type": "answer_is",
//                                 "task": {
//                                     "type": "task",
//                                     "id": "68e7546995ee8b20832984e9",
//                                     "name": "8",
//                                     "points": 5,
//                                     "answerType": "multiple"
//                                 },
//                                 "isCorrect": true
//                             },
//                             "do": [
//                                 {
//                                     "type": "finish"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
// export const data2 = {
//     "flow": [
//         {
//             "type": "show_in_list",
//             "task": {
//                 "type": "tasks_with_tag",
//                 "tag": "architecture"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "timer_after_finished",
//                 "op": ">",
//                 "seconds": 10,
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "tasks_with_tag",
//                         "tag": "ram"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "show_tasks_on_playground",
//             "playground": 4,
//             "task": {
//                 "type": "tasks_range",
//                 "start": 1,
//                 "end": 5
//             }
//         },
//         {
//             "type": "activate",
//             "task": {
//                 "type": "task",
//                 "id": "11",
//                 "name": "11",
//                 "points": 5,
//                 "answerType": "multiple"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "task",
//                     "id": "11",
//                     "name": "11",
//                     "points": 5,
//                     "answerType": "multiple"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "tasks_with_tag",
//                         "tag": "architecture"
//                     }
//                 },
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "tasks_with_tag",
//                         "tag": "geomatry"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "and",
//                 "conditions": [
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "tasks_with_tag",
//                             "tag": "architecture"
//                         }
//                     },
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "tasks_with_tag",
//                             "tag": "geomatry"
//                         }
//                     }
//                 ]
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "all_tasks"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "finish"
//                 }
//             ]
//         }
//     ]
// }

// export const data2 = {
//     "flow": [
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "timer_after_finished",
//                 "op": ">",
//                 "seconds": 5,
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "tasks_with_tag",
//                         "tag": "architecture"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "activate",
//             "task": {
//                 "type": "task",
//                 "id": "10",
//                 "name": "10",
//                 "points": 5,
//                 "answerType": "multiple"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "task",
//                     "id": "10",
//                     "name": "10",
//                     "points": 5,
//                     "answerType": "multiple"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "timer_after_finished",
//                         "op": "===",
//                         "seconds": 20,
//                         "task": {
//                             "type": "all_tasks"
//                         }
//                     },
//                     "do": [
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "tasks_with_tag",
//                                 "tag": "architecture"
//                             }
//                         },
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "tasks_with_tag",
//                                 "tag": "geomatry"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "and",
//                 "conditions": [
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "tasks_with_tag",
//                             "tag": "architecture"
//                         }
//                     },
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "tasks_with_tag",
//                             "tag": "geomatry"
//                         }
//                     }
//                 ]
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "all_tasks"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "finish"
//                 }
//             ]
//         }
//     ]
// }

// export const data2 = {
//     "flow": [
//         {
//             "type": "activate",
//             "task": {
//                 "type": "task",
//                 "id": "10",
//                 "name": "10",
//                 "points": 5,
//                 "answerType": "multiple"
//             }
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "task",
//                     "id": "10",
//                     "name": "10",
//                     "points": 5,
//                     "answerType": "multiple"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "when_then",
//                     "condition": {
//                         "type": "timer",
//                         "op": ">",
//                         "seconds": 1500
//                     },
//                     "do": [
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "tasks_with_tag",
//                                 "tag": "architecture"
//                             }
//                         },
//                         {
//                             "type": "show_on_playground",
//                             "index": 1,
//                             "task": {
//                                 "type": "tasks_with_tag",
//                                 "tag": "geomatry"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "and",
//                 "conditions": [
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "tasks_with_tag",
//                             "tag": "architecture"
//                         }
//                     },
//                     {
//                         "type": "task_finished",
//                         "task": {
//                             "type": "tasks_with_tag",
//                             "tag": "geomatry"
//                         }
//                     }
//                 ]
//             },
//             "do": [
//                 {
//                     "type": "show_on_playground",
//                     "index": 1,
//                     "task": {
//                         "type": "all_tasks"
//                     }
//                 }
//             ]
//         },
//         {
//             "type": "when_then",
//             "condition": {
//                 "type": "task_finished",
//                 "task": {
//                     "type": "all_tasks"
//                 }
//             },
//             "do": [
//                 {
//                     "type": "deactivate",
//                     "task": null
//                 }
//             ]
//         },
//         {
//             "type": "timer_after_finished",
//             "op": ">",
//             "seconds": 0,
//             "task": null
//         }
//     ]
// }

export const data2 = {
    "flow": [
        {
            "type": "activate",
            "task": {
                "type": "task",
                "id": "6904803194c8e7ae00fe6ef9",
                "name": "Ahmedabad Visit Task"
            }
        },
        {
            "type": "when_then",
            "condition": {
                "type": "task_finished",
                "task": {
                    "type": "task",
                    "id": "6904803194c8e7ae00fe6ef9",
                    "name": "Ahmedabad Visit Task"
                }
            },
            "do": [
                {
                    "type": "show_in_list",
                    "task": {
                        "type": "tasks_range",
                        "start": 2,
                        "end": 4
                    }
                }
            ]
        },
        {
            "type": "when_then",
            "condition": {
                "type": "timer",
                "op": ">",
                "seconds": 60
            },
            "do": [
                {
                    "type": "show_on_playground",
                    "index": 1,
                    "task": {
                        "type": "all_tasks"
                    }
                }
            ]
        },
        {
            "type": "when_then",
            "condition": {
                "type": "task_finished",
                "task": {
                    "type": "tasks_with_tag",
                    "tag": "architecture"
                }
            },
            "do": [
                {
                    "type": "show_on_playground",
                    "index": 1,
                    "task": {
                        "type": "all_tasks"
                    }
                }
            ]
        },
        {
            "type": "when_then",
            "condition": {
                "type": "task_finished",
                "task": {
                    "type": "all_tasks"
                }
            },
            "do": [
                {
                    "type": "finish"
                }
            ]
        }
    ]
}

export const questionsFinished = [
    {
        success: true,
        code: 200,
        response: {
            _id: '68e89ff2169f8f357ef63694',
            game: {
                _id: '68e89fcf76bff4348c969b05',
                title: 'Mystery Escape Room 4',
                status: 'active',
            },
            questions: [
                {
                    _id: '68ecd3bd20095fc2938ef5c1',
                    question: {
                        _id: '1',
                        questionName: 'Solve this puzzle',
                        questionDescription: {
                            ops: [
                                {
                                    insert: 'Solve the following puzzles!!!\n',
                                },
                            ],
                        },
                        answerType: 'puzzle',
                        options: [],
                        correctAnswers: [],
                        puzzle: {
                            _id: '68ecc90c128b9cbfa7489be3',
                            name: 'Crosswords - 1',
                            url: 'https://izimorocco-jeux.online/Puzzle-mots-croises.html',
                            isDeleted: false,
                            createdAt: '2025-10-13T09:40:28.066Z',
                            updatedAt: '2025-10-13T09:40:28.066Z',
                        },
                        points: 30,
                        tags: [
                            {
                                _id: '68df799eebbeab4cd22078cb',
                                name: 'educatio',
                                manualEntry: false,
                                isDeleted: false,
                                updatedAt: '2025-10-09T12:25:06.591Z',
                            },
                        ],
                        isDeleted: false,
                        createdBy: {
                            _id: '67707eba29571f4e14a66acf',
                            email: 'super@admin.com',
                        },
                        createdAt: '2025-10-13T09:43:51.404Z',
                        updatedAt: '2025-10-13T09:43:51.404Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/dlmepr5jania7kfzw1h8',
                        iconName: 'Puzzle',
                        locationRadius: 550,
                        radiusColor: 'rgba(73, 240, 12, 1)',
                    },
                    latitude: 23.113992,
                    longitude: 72.540105,
                    radius: 200,
                    order: 8,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c3',
                    question: {
                        _id: '2',
                        questionName: 'What is 1+1  ,1+2 ,1+3',
                        // questionName: 'What is 1 + 1, 1 + 2, and 1 + 3?',
                        questionDescription: {
                            ops: [
                                {
                                    insert: 'Sans Serif font style\n',
                                },
                                {
                                    attributes: {
                                        font: 'serif',
                                    },
                                    insert: 'Serif font style',
                                },
                                {
                                    insert: '\n',
                                },
                                {
                                    insert: '\n',
                                },
                                {
                                    attributes: {
                                        size: 'huge',
                                    },
                                    insert: 'Huge Text',
                                },
                                {
                                    insert: '\n\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Bold Text',
                                },
                                {
                                    attributes: {
                                        underline: true,
                                    },
                                    insert: 'underline Text',
                                },
                                {
                                    insert: '\n',
                                },
                                {
                                    attributes: {
                                        strike: true,
                                    },
                                    insert: 'cross line Text',
                                },
                                {
                                    insert: '\n\n',
                                },
                                {
                                    insert: '\n\nX',
                                },
                                {
                                    attributes: {
                                        list: 'ordered',
                                    },
                                    insert: '\n',
                                },
                                {
                                    insert: 'symbolic list\nlist 1',
                                },
                                {
                                    attributes: {
                                        list: 'bullet',
                                    },
                                    insert: '\n',
                                },
                                {
                                    insert: 'list 4',
                                },
                                {
                                    insert: 'text with right space',
                                },
                                {
                                    attributes: {
                                        indent: 7,
                                    },
                                    insert: '\n\n',
                                },
                                {
                                    insert: 'justify text with starting to ending',
                                },
                                {
                                    attributes: {
                                        align: 'justify',
                                        'code-block': 'plain',
                                    },
                                    insert: '\n\n',
                                },
                                {
                                    attributes: {
                                        link: 'www.harshalkahar.com',
                                    },
                                    insert: 'www.harshalkahar.com',
                                },
                                {
                                    attributes: {
                                        align: 'justify',
                                    },
                                    insert: '\n',
                                },
                                {
                                    insert: {
                                        image:
                                            'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/nbhsaexvvvs4vg2meu52',
                                    },
                                },
                                {
                                    attributes: {
                                        align: 'justify',
                                    },
                                    insert: '\n',
                                },
                            ],
                        },
                        answerType: 'number',
                        options: [],
                        correctAnswers: ['55'],
                        points: 5,
                        tags: [
                            {
                                _id: '68df7c1530a73cd41862951c',
                                name: 'happy',
                                manualEntry: false,
                                createdAt: '2025-10-03T07:32:37.063Z',
                                updatedAt: '2025-10-03T07:32:37.063Z',
                            },
                            {
                                _id: '68e4e5c84cb161423a2cefa2',
                                name: 'food',
                                manualEntry: false,
                                isDeleted: false,
                                createdAt: '2025-10-07T10:04:56.686Z',
                                updatedAt: '2025-10-07T10:04:56.686Z',
                            },
                        ],
                        isDeleted: false,
                        createdBy: '67707eba29571f4e14a66acf',
                        createdAt: '2025-10-10T09:58:48.820Z',
                        updatedAt: '2025-10-10T09:58:48.820Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/dlmepr5jania7kfzw1h8',
                        iconName: 'Logo Name',
                        locationRadius: 450,
                        radiusColor: 'rgba(209, 49, 16, 1)',
                    },
                    latitude: 23.110192,
                    longitude: 72.540105,
                    radius: 350,
                    order: 8,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c4',
                    question: {
                        _id: '3',
                        questionName: 'Which tree is this?',
                        questionDescription: {
                            ops: [
                                {
                                    insert:
                                        'A recursion tree is a visual representation used to understand and analyze the behavior of recursive algorithms and recurrence relations. It depicts the breakdown of a problem into smaller subproblems through recursive calls, illustrating the work performed at each level of recursion.\n\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Nodes',
                                },
                                {
                                    insert:
                                        ':\nEach node in the tree represents a recursive call or a subproblem. The value within a node typically signifies the cost or work associated with that particular subproblem.\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Root',
                                },
                                {
                                    insert:
                                        ':\nThe root node represents the initial problem or the top-level recursive call.\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Branches',
                                },
                                {
                                    insert:
                                        ':\nBranches extending from a node indicate the recursive calls made by that subproblem.\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Levels',
                                },
                                {
                                    insert:
                                        ':\nThe tree is organized into levels, with each level representing a stage of recursion.\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Leaves',
                                },
                                {
                                    insert:
                                        ':\nLeaf nodes represent the base cases of the recursion, where no further recursive calls are made.\n\n',
                                },
                                {
                                    insert: {
                                        image:
                                            'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/g9ywptxyma8xjt6v60hd',
                                    },
                                },
                                {
                                    insert: '\n\n',
                                },
                                {
                                    attributes: {
                                        underline: true,
                                    },
                                    insert: 'The above tree is also called as which tree??',
                                },
                                {
                                    insert: '\n',
                                },
                            ],
                        },
                        answerType: 'mcq',
                        options: [
                            {
                                text: 'Pear tree',
                                isCorrect: false,
                                _id: '68ecc5db128b9cbfa7489b9f',
                            },
                            {
                                text: 'Neem Tree',
                                isCorrect: false,
                                _id: '68ecc5db128b9cbfa7489ba0',
                            },
                            {
                                text: 'Recursion Tree',
                                isCorrect: true,
                                _id: '68ecc5db128b9cbfa7489ba1',
                            },
                            {
                                text: 'Olive Tree',
                                isCorrect: false,
                                _id: '68ecc5db128b9cbfa7489ba2',
                            },
                        ],
                        correctAnswers: ['Recursion Tree'],
                        points: 48,
                        tags: [
                            {
                                _id: '68df799eebbeab4cd22078c9',
                                name: 'technology',
                                manualEntry: false,
                            },
                            {
                                _id: '68df799eebbeab4cd22078ca',
                                name: 'health',
                                manualEntry: false,
                            },
                            {
                                _id: '68df799eebbeab4cd22078cb',
                                name: 'educatio',
                                manualEntry: false,
                                isDeleted: false,
                                updatedAt: '2025-10-09T12:25:06.591Z',
                            },
                            {
                                _id: '68df799eebbeab4cd22078d0',
                                name: 'science',
                                manualEntry: false,
                            },
                        ],
                        isDeleted: false,
                        createdBy: {
                            _id: '67707eba29571f4e14a66acf',
                            email: 'super@admin.com',
                        },
                        createdAt: '2025-10-13T06:13:11.566Z',
                        updatedAt: '2025-10-13T09:26:51.842Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/mk7i8ollytwoillz7e9e',
                        iconName: 'Tree',
                        locationRadius: 250,
                        radiusColor: 'rgba(195, 3, 248, 1)',
                    },
                    latitude: 23.113492,
                    longitude: 72.540105,
                    radius: 150,
                    order: 8,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '5c4f1d7b6e8d48a3a9f234a2',
                    question: {
                        _id: '4',
                        questionName: 'Tell me about the Taj Mahal',
                        questionDescription: {
                            ops: [
                                {
                                    insert:
                                        'The Taj Mahal is a stunning white marble mausoleum located in Agra, India. It was commissioned by the Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal, who passed away during childbirth in 1631. The construction of the Taj Mahal began in 1632 and was completed in 1653.\n\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Architectural Beauty',
                                },
                                {
                                    insert:
                                        ':\nThe Taj Mahal is known for its symmetrical beauty and intricate design. The central dome is surrounded by lush gardens, water bodies, and four minarets. The white marble, sourced from Makrana in Rajasthan, gives the structure its radiant appearance.\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'Symbolism',
                                },
                                {
                                    insert:
                                        ':\nIt is considered a symbol of eternal love and is often regarded as one of the most beautiful buildings in the world. The Taj Mahal’s design integrates elements of Persian, Ottoman Turkish, and Indian architecture.\n',
                                },
                                {
                                    attributes: {
                                        bold: true,
                                    },
                                    insert: 'UNESCO World Heritage Site',
                                },
                                {
                                    insert:
                                        ':\nIn 1983, the Taj Mahal was designated a UNESCO World Heritage Site due to its outstanding architectural beauty and cultural significance.\n',
                                },
                                {
                                    insert: {
                                        image:
                                            'https://res.cloudinary.com/dxoipnmx0/image/upload/v1644209376/taj_mahal.jpg',
                                    },
                                },
                                {
                                    insert: '\n\n',
                                },
                                {
                                    insert:
                                        'This magnificent structure draws millions of visitors every year and continues to be one of India’s most iconic landmarks.',
                                },
                            ],
                        },
                        answerType: 'no_answer',
                        points: 0,
                        tags: [
                            {
                                _id: '1',
                                name: 'history',
                                manualEntry: false,
                            },
                            {
                                _id: '2',
                                name: 'culture',
                                manualEntry: false,
                            },
                            {
                                _id: '3',
                                name: 'architecture',
                                manualEntry: false,
                            },
                        ],
                        isDeleted: false,
                        createdBy: {
                            _id: 'admin',
                            email: 'admin@example.com',
                        },
                        createdAt: '2025-10-14T10:00:00Z',
                        updatedAt: '2025-10-14T10:00:00Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1644209376/taj_mahal_icon.png',
                        iconName: 'Taj Mahal',
                        locationRadius: 250,
                        radiusColor: 'rgba(255, 0, 0, 1)',
                    },
                    latitude: 27.1751,
                    longitude: 78.0421,
                    radius: 150,
                    order: 1,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c5',
                    question: {
                        _id: '5',
                        questionName: 'What is the capital of Japan?',
                        questionDescription: {
                            ops: [{ insert: 'Choose the correct capital city of Japan.\n' }]
                        },
                        answerType: 'mcq',
                        options: [
                            { text: 'Kyoto', isCorrect: false, _id: '68ecc5db128b9cbfa7489ba3' },
                            { text: 'Tokyo', isCorrect: true, _id: '68ecc5db128b9cbfa7489ba4' },
                            { text: 'Osaka', isCorrect: false, _id: '68ecc5db128b9cbfa7489ba5' },
                            { text: 'Nagoya', isCorrect: false, _id: '68ecc5db128b9cbfa7489ba6' }
                        ],
                        correctAnswers: ['Tokyo'],
                        points: 10,
                        tags: [
                            { _id: '68df799eebbeab4cd22078e1', name: 'geography', manualEntry: false }
                        ],
                        isDeleted: false,
                        createdBy: { _id: '67707eba29571f4e14a66acf', email: 'super@admin.com' },
                        createdAt: '2025-10-15T10:00:00.000Z',
                        updatedAt: '2025-10-15T10:00:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/tokyo_icon',
                        iconName: 'Japan',
                        locationRadius: 300,
                        radiusColor: 'rgba(255, 165, 0, 1)'
                    },
                    latitude: 35.6762,
                    longitude: 139.6503,
                    radius: 200,
                    order: 2,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c6',
                    question: {
                        _id: '6',
                        questionName: 'Solve: 12 × 8 ÷ 4 + 6',
                        questionDescription: {
                            ops: [{ insert: 'Apply BODMAS rule to solve this equation.\n' }]
                        },
                        answerType: 'number',
                        options: [],
                        correctAnswers: ['30'],
                        points: 8,
                        tags: [{ _id: '68df799eebbeab4cd22078e2', name: 'math', manualEntry: false }],
                        isDeleted: false,
                        createdBy: '67707eba29571f4e14a66acf',
                        createdAt: '2025-10-15T11:00:00.000Z',
                        updatedAt: '2025-10-15T11:00:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/math_icon',
                        iconName: 'Math',
                        locationRadius: 250,
                        radiusColor: 'rgba(0, 128, 255, 1)'
                    },
                    latitude: 23.114992,
                    longitude: 72.540305,
                    radius: 150,
                    order: 3,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c7',
                    question: {
                        _id: '7',
                        questionName: 'Identify the Monument',
                        questionDescription: {
                            ops: [
                                { insert: 'This monument is located in Paris and built of iron.\n' },
                                {
                                    insert: {
                                        image:
                                            'https://res.cloudinary.com/dxoipnmx0/image/upload/v1644209376/eiffel_tower.jpg'
                                    }
                                }
                            ]
                        },
                        answerType: 'mcq',
                        options: [
                            { text: 'Big Ben', isCorrect: false, _id: '68ecc5db128b9cbfa7489ba7' },
                            { text: 'Eiffel Tower', isCorrect: true, _id: '68ecc5db128b9cbfa7489ba8' },
                            { text: 'Leaning Tower of Pisa', isCorrect: false, _id: '68ecc5db128b9cbfa7489ba9' },
                            { text: 'Statue of Liberty', isCorrect: false, _id: '68ecc5db128b9cbfa7489baa' }
                        ],
                        correctAnswers: ['Eiffel Tower'],
                        points: 12,
                        tags: [
                            { _id: '68df799eebbeab4cd22078e3', name: 'architecture', manualEntry: false }
                        ],
                        isDeleted: false,
                        createdBy: {
                            _id: '67707eba29571f4e14a66acf',
                            email: 'super@admin.com'
                        },
                        createdAt: '2025-10-15T12:00:00.000Z',
                        updatedAt: '2025-10-15T12:00:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/eiffel_icon',
                        iconName: 'Eiffel Tower',
                        locationRadius: 250,
                        radiusColor: 'rgba(255, 105, 180, 1)'
                    },
                    latitude: 48.8584,
                    longitude: 2.2945,
                    radius: 150,
                    order: 4,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c8',
                    question: {
                        _id: '8',
                        questionName: 'Crossword Challenge 2',
                        questionDescription: {
                            ops: [{ insert: 'Solve the crossword puzzle below!\n' }]
                        },
                        answerType: 'puzzle',
                        options: [],
                        correctAnswers: [],
                        puzzle: {
                            _id: '68ecc90c128b9cbfa7489be4',
                            name: 'Crosswords - 2',
                            url: 'https://izimorocco-jeux.online/Puzzle-mots-croises-2.html',
                            isDeleted: false,
                            createdAt: '2025-10-15T09:00:00.000Z',
                            updatedAt: '2025-10-15T09:00:00.000Z'
                        },
                        points: 25,
                        tags: [
                            { _id: '68df799eebbeab4cd22078e4', name: 'puzzle', manualEntry: false }
                        ],
                        isDeleted: false,
                        createdBy: { _id: '67707eba29571f4e14a66acf', email: 'super@admin.com' },
                        createdAt: '2025-10-15T09:10:00.000Z',
                        updatedAt: '2025-10-15T09:10:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/puzzle2_icon',
                        iconName: 'Puzzle 2',
                        locationRadius: 400,
                        radiusColor: 'rgba(100, 255, 100, 1)'
                    },
                    latitude: 23.114992,
                    longitude: 72.541105,
                    radius: 200,
                    order: 5,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5c9',
                    question: {
                        _id: '9',
                        questionName: 'Name the planet known as the Red Planet',
                        questionDescription: {
                            ops: [{ insert: 'Select the correct planet associated with this name.\n' }]
                        },
                        answerType: 'mcq',
                        options: [
                            { text: 'Earth', isCorrect: false, _id: '68ecc5db128b9cbfa7489bab' },
                            { text: 'Mars', isCorrect: true, _id: '68ecc5db128b9cbfa7489bac' },
                            { text: 'Venus', isCorrect: false, _id: '68ecc5db128b9cbfa7489bad' },
                            { text: 'Jupiter', isCorrect: false, _id: '68ecc5db128b9cbfa7489bae' }
                        ],
                        correctAnswers: ['Mars'],
                        points: 10,
                        tags: [
                            { _id: '68df799eebbeab4cd22078e5', name: 'space', manualEntry: false }
                        ],
                        isDeleted: false,
                        createdBy: { _id: '67707eba29571f4e14a66acf', email: 'super@admin.com' },
                        createdAt: '2025-10-15T09:20:00.000Z',
                        updatedAt: '2025-10-15T09:20:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/mars_icon',
                        iconName: 'Mars',
                        locationRadius: 350,
                        radiusColor: 'rgba(255, 69, 0, 1)'
                    },
                    latitude: 23.116192,
                    longitude: 72.541905,
                    radius: 150,
                    order: 6,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5ca',
                    question: {
                        _id: '10',
                        questionName: 'Which ocean is the largest?',
                        questionDescription: {
                            ops: [{ insert: 'Pick the largest ocean in the world.\n' }]
                        },
                        answerType: 'mcq',
                        options: [
                            { text: 'Atlantic Ocean', isCorrect: false, _id: '68ecc5db128b9cbfa7489baf' },
                            { text: 'Pacific Ocean', isCorrect: true, _id: '68ecc5db128b9cbfa7489bb0' },
                            { text: 'Indian Ocean', isCorrect: false, _id: '68ecc5db128b9cbfa7489bb1' },
                            { text: 'Arctic Ocean', isCorrect: false, _id: '68ecc5db128b9cbfa7489bb2' }
                        ],
                        correctAnswers: ['Pacific Ocean'],
                        points: 12,
                        tags: [
                            { _id: '68df799eebbeab4cd22078e6', name: 'geography', manualEntry: false }
                        ],
                        isDeleted: false,
                        createdBy: {
                            _id: '67707eba29571f4e14a66acf',
                            email: 'super@admin.com'
                        },
                        createdAt: '2025-10-15T09:30:00.000Z',
                        updatedAt: '2025-10-15T09:30:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/ocean_icon',
                        iconName: 'Ocean',
                        locationRadius: 280,
                        radiusColor: 'rgba(0, 191, 255, 1)'
                    },
                    latitude: 23.118992,
                    longitude: 72.542105,
                    radius: 150,
                    order: 7,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                },
                {
                    _id: '68ecd3bd20095fc2938ef5cb',
                    question: {
                        _id: '11',
                        questionName: 'Who discovered Gravity?',
                        questionDescription: {
                            ops: [{ insert: 'Select the scientist who formulated the law of gravity.\n' }]
                        },
                        answerType: 'mcq',
                        options: [
                            { text: 'Albert Einstein', isCorrect: false, _id: '68ecc5db128b9cbfa7489bb3' },
                            { text: 'Isaac Newton', isCorrect: true, _id: '68ecc5db128b9cbfa7489bb4' },
                            { text: 'Nikola Tesla', isCorrect: false, _id: '68ecc5db128b9cbfa7489bb5' },
                            { text: 'Galileo Galilei', isCorrect: false, _id: '68ecc5db128b9cbfa7489bb6' }
                        ],
                        correctAnswers: ['Isaac Newton'],
                        points: 15,
                        tags: [
                            { _id: '68df799eebbeab4cd22078e7', name: 'science', manualEntry: false }
                        ],
                        isDeleted: false,
                        createdBy: {
                            _id: '67707eba29571f4e14a66acf',
                            email: 'super@admin.com'
                        },
                        createdAt: '2025-10-15T09:40:00.000Z',
                        updatedAt: '2025-10-15T09:40:00.000Z',
                        icon: 'https://res.cloudinary.com/dxoipnmx0/image/upload/v1759483737/uploads/newton_icon',
                        iconName: 'Gravity',
                        locationRadius: 300,
                        radiusColor: 'rgba(128, 0, 128, 1)'
                    },
                    latitude: 23.120992,
                    longitude: 72.543105,
                    radius: 150,
                    order: 8,
                    isFinished: false,
                    isCorrect: false,
                    isDisplayed: false,
                    isShownOnPlayground: false,
                }
            ],
            createdAt: '2025-10-10T05:56:02.857Z',
            updatedAt: '2025-10-13T10:26:05.723Z',
        },
        message: 'Game questions retrieved successfully',
    },
];