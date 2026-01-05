export const markerJson = {
  "version": "1.0",
  "timestamp": "2025-10-10T16:21:09.796Z",
  "rules": [
    {
      "id": "|m)wBy`0c2/iDB+|uR/k",
      "type": "when_then_block",
      "fields": {},
      "inputs": {
        "CONDITION": {
          "id": "v,Ba}{M{e9ZlbqS6S/SM",
          "type": "answer_is",
          "fields": {
            "ANSWER": "CORRECT"
          },
          "inputs": {},
          "next": null
        },
        "DO": {
          "id": "(.1d8nl]D)u7ro.(loSz",
          "type": "open_for_answering",
          "fields": {},
          "inputs": {
            "INPUT": {
              "id": "p-SG(FG.gC5iSuefX^Op",
              "type": "tasks_range",
              "fields": {
                "FROM": 1,
                "TO": 2
              },
              "inputs": {},
              "next": null
            }
          },
          "next": {
            "id": "M~1ovSg]xcko:8t!,Nud",
            "type": "show_on_map",
            "fields": {},
            "inputs": {
              "INPUT": {
                "id": "Cq,Yiy@k$xR[:oXu{*wD",
                "type": "tasks_range",
                "fields": {
                  "FROM": 2,
                  "TO": 10
                },
                "inputs": {},
                "next": null
              }
            },
            "next": null
          }
        }
      },
      "next": {
        "id": "cNmY6Ap$._PqCj+3|)lB",
        "type": "when_then_block",
        "fields": {},
        "inputs": {
          "CONDITION": {
            "id": "kX%oKVR|y76j!%GjETGv",
            "type": "logic_and_or",
            "fields": {
              "OPERATOR": "AND"
            },
            "inputs": {
              "A": {
                "id": "zbDJW~yGN@lqp1+I`^lq",
                "type": "scan_qr",
                "fields": {
                  "QR_CHECK": "FALSE"
                },
                "inputs": {},
                "next": null
              },
              "B": {
                "id": "b~IJ-9apJN%Wb4as9V#C",
                "type": "answer_is",
                "fields": {
                  "ANSWER": "CORRECT"
                },
                "inputs": {},
                "next": null
              }
            },
            "next": null
          },
          "DO": {
            "id": "mDx=p1hA/n*,FKJ+jlNH",
            "type": "show_on_map",
            "fields": {},
            "inputs": {
              "INPUT": {
                "id": "-,5oZxqal=]0[i!lOW@U",
                "type": "all_tasks",
                "fields": {},
                "inputs": {},
                "next": null
              }
            },
            "next": {
              "id": "*.T?{ud(f2.`81cX0.}t",
              "type": "show_on_map",
              "fields": {},
              "inputs": {
                "INPUT": {
                  "id": "29RU,S?0e],MG}5UDp(`",
                  "type": "tasks_with_tag",
                  "fields": {
                    "TAG": ""
                  },
                  "inputs": {},
                  "next": null
                }
              },
              "next": {
                "id": "/e]B)I@p|q{S~p3*1H7(",
                "type": "show_on_map",
                "fields": {},
                "inputs": {
                  "INPUT": {
                    "id": "ZSA9KBLzpJ|wCVG5~?Z8",
                    "type": "tasks_range",
                    "fields": {
                      "FROM": 2,
                      "TO": 10
                    },
                    "inputs": {},
                    "next": null
                  }
                },
                "next": null
              }
            }
          }
        },
        "next": null
      }
    }
  ]
}





// export const markerJson = {
//   "version": "1.0",
//   "timestamp": "2025-10-10T03:18:22.720Z",
//   "rules": [
//     {
//       "id": "^qadaGM[28vAZ+^Lk^tJ",
//       "type": "when_then_block",
//       "fields": {},
//       "inputs": {
//         "CONDITION": {
//           "id": "Augd3BckOW;Qf,_N;!Xg",
//           "type": "logic_and_or",
//           "fields": {
//             "OPERATOR": "AND"
//           },
//           "inputs": {
//             "A": {
//               "id": "8]a]B7hP`up.mrTo}aAF",
//               "type": "answer_is",
//               "fields": {
//                 "ANSWER": "CORRECT"
//               },
//               "inputs": {},
//               "next": null
//             },
//             "B": {
//               "id": "Hg7NvJ*-QFt?CF4Vj_/E",
//               "type": "scan_qr",
//               "fields": {
//                 "QR_CHECK": "FALSE"
//               },
//               "inputs": {},
//               "next": null
//             }
//           },
//           "next": null
//         },
//         "DO": {
//           "id": "0={]gtxsLkSYQ:Jk-?+1",
//           "type": "show_on_map",
//           "fields": {},
//           "inputs": {
//             "INPUT": {
//               "id": "pop4(xiR{{2D{cC}Tt{M",
//               "type": "tasks_range",
//               "fields": {
//                 "FROM": 1,
//                 "TO": 5
//               },
//               "inputs": {},
//               "next": null
//             }
//           },
//           "next": {
//             "id": "SAW~Qx-2j@/7=6.MQNBx",
//             "type": "show_on_map",
//             "fields": {},
//             "inputs": {
//               "INPUT": {
//                 "id": "=yr2ZD0{fE9i}$5A;3F_",
//                 "type": "tasks_range",
//                 "fields": {
//                   "FROM": 1,
//                   "TO": 3
//                 },
//                 "inputs": {},
//                 "next": null
//               }
//             },
//             "next": null
//           }
//         }
//       },
//       "next": null
//     }
//   ]
// }





// export const markerJson = {
//   "version": "1.0",
//   "timestamp": "2025-10-09T18:29:15.590Z",
//   "rules": [
//     {
//       "id": "W?dvFJ)*jQTbn.U~,=[H",
//       "type": "when_then_block",
//       "fields": {},
//       "inputs": {
//         "CONDITION": {
//           "id": "#~MzHV#SHhx5HP5eHne5",
//           "type": "last_answer_is",
//           "fields": {
//             "WHICH": "FIRST",
//             "CHECK": "TRUE"
//           },
//           "inputs": {
//             "INPUT": {
//               "id": "T@5c3^0G1Af%pzn0BX8-",
//               "type": "logic_and_or",
//               "fields": {
//                 "OPERATOR": "OR"
//               },
//               "inputs": {
//                 "A": {
//                   "id": ".W{6tY`8$E?8pkMtPPVj",
//                   "type": "answer_is",
//                   "fields": {
//                     "ANSWER": "CORRECT"
//                   },
//                   "inputs": {},
//                   "next": null
//                 },
//                 "B": {
//                   "id": "p_G;uEY|;w$sSr.Il@MA",
//                   "type": "logic_and_or",
//                   "fields": {
//                     "OPERATOR": "AND"
//                   },
//                   "inputs": {
//                     "A": {
//                       "id": "m_V6z*;E2akxp[NvC+-j",
//                       "type": "score_check",
//                       "fields": {
//                         "METRIC": "SCORE",
//                         "VALUE": 0
//                       },
//                       "inputs": {},
//                       "next": null
//                     },
//                     "B": {
//                       "id": "XPtzpY27|^!F?b%?*Jb:",
//                       "type": "all_tasks",
//                       "fields": {},
//                       "inputs": {},
//                       "next": null
//                     }
//                   },
//                   "next": null
//                 }
//               },
//               "next": {
//                 id: "9cXhH|Yc0Xg$yE~P}h;A",
//                 // type: "logic_not",
//                 // fields: {},
//               }
//             }
//           },
//           "next": null
//         },
//         "DO": {
//           "id": "U={//Q)5P.c12(C;2#?X",
//           "type": "show_in_list",
//           "fields": {},
//           "inputs": {
//             "INPUT": {
//               "id": "cOAUp@McH*KxAD76@hQR",
//               "type": "tasks_range",
//               "fields": {
//                 "FROM": 1,
//                 "TO": 5
//               },
//               "inputs": {},
//               "next": null
//             }
//           },
//           "next": null
//         }
//       },
//       "next": null
//     }
//   ]
// }

// export const markerJson = {
//   version: '1.0',
//   timestamp: '2025-10-09T05:44:06.641Z',
//   rules: [
//     {
//       id: '7#r1}h-[d}q?00A![3Nf',
//       type: 'when_then_block',
//       fields: {},
//       inputs: {
//         CONDITION: {
//           id: '+f0gT^*b/uAfhWCm~ckw',
//           type: 'scan_qr',
//           fields: {
//             QR_CHECK: 'TRUE',
//           },
//           inputs: {},
//           next: null,
//         },
//         DO: {
//           id: '%5F2n#Z!qc7Hkbqk.}Cm',
//           type: 'show_on_map',
//           fields: {},
//           inputs: {
//             INPUT: {
//               id: 'A4$*uz=a_|o~o?~l(Q`}',
//               type: 'all_tasks',
//               fields: {},
//               inputs: {},
//               next: null,
//             },
//           },
//           next: null,
//         },
//       },
//       next: null,
//     },
//   ],
// };

