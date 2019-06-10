const mongoose = eval('require\("mongoose"\)');
import { send, register, receive, connectionEvents } from "./webSocketServer";
import { Global } from "@jest/types";

let db = mongoose.createConnection('mongodb://localhost/test');

db.on('error', e => console.error(e));
db.on('open', () => {
  console.log("数据库连接成功");

  const ObjectId = mongoose.Schema.Types.ObjectId;

  let PathSchema = mongoose.Schema({
    theClass: String,
    groupType: String,
    group: String,
    member: String
  });

  let ScoreSchema = mongoose.Schema({
    at: {
      type: ObjectId,
      ref: "ScoreType"
    },
    value: Number
  });

  let ExpressionSchema = mongoose.Schema({
    path: PathSchema,
    tag: Boolean
  });

  let ExpressionGroupSchema = mongoose.Schema({
    read: [ExpressionSchema],
    write: [ExpressionSchema],
    add: [ExpressionSchema],
    minus: [ExpressionSchema]
  });

  let TradeRuleSchema = mongoose.Schema({
    from: {
      type: ObjectId,
      ref: "ScoreType"
    },
    to: {
      type: ObjectId,
      ref: "ScoreType"
    },
    weight: {
      from: Number,
      to: Number,
      decimalPartRule: {
        type: String,
        enum: ['toZero', 'toOne', 'nearly']     // 分别代表抹零、进一和四舍五入
      }
    }
  });

  let ScoreTypeSchema = mongoose.Schema({
    name: {
      type: String,
      index: true
    },
    description: String,
    tradeRules: [TradeRuleSchema],
    virtual: Boolean    // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息
  });

  let ScoreGroupSchema = mongoose.Schema({
    name: {
      type: String,
      index: true
    },
    description: String,
    usingScoreTypes: [{
      type: ObjectId,
      ref: 'ScoreType'
    }]
  });

  let ClassTableItemSchema = mongoose.Schema({
    timeForm: Date,
    timeTo: Date,
    dateFrom: Date,
    dateTo: Date,
    subject: String,
    repeatAt: {
      type: String,
      enum: [
        'Mon',
        'Tue',
        'Wed',
        'Thr',
        'Fri',
        'Sat',
        'Sun'
      ]
    }
  });

  let ClassTableSchema = mongoose.Schema({
    description: String,
    name: {
      type: String,
      index: true
    },
    timeLine: [ClassTableItemSchema],
    userType: {
      type: String,
      enum: ['student', 'teacher']
    }
  });

  let ConfigSchema = mongoose.Schema({
    allow: [{
      type: String,
      enum: [
        'createQuestion',
        'forkQuestion',
        'deleteQuestion',
        'createTest',
        'watchTestResult',
        'forkTest',
        'deleteTest',
        'setTheme',
        'root'
      ]
    }],
    disallow: [{
      type: String,
      enum: [
        'createQuestion',
        'forkQuestion',
        'deleteQuestion',
        'createTest',
        'watchTestResult',
        'forkTest',
        'deleteTest',
        'setTheme',
        'root'
      ]
    }]
  });

  let ClassStateSchema = mongoose.Schema({
    isHavingClass: {
      type: String,
      enum: [
        'begin',    // 正常上课
        'over',     // 下课
        'continue'  // 拖堂
      ]
    },
    nowTeacher: {
      type: ObjectId,
      ref: 'Account'
    }
  });

  let ProvideSchema = mongoose.Schema({
    to: {
      type: String,
      enum: [
        'class',
        'group',
        'member'
      ]
    },
    atClass: {
      type: ObjectId,
      ref: 'Class'
    },
    atGroup: {
      type: ObjectId,
      ref: 'Group'
    },
    atMember: {
      type: ObjectId,
      ref: 'Account'
    }
  });

  let QuestionSchema = mongoose.Schema({
    owner: {
      type: ObjectId,
      ref: 'Account',
      index: true
    },
    forkFrom: {
      type: ObjectId,
      ref: 'Question'
    },
    questionType: {
      type: String,
      enum: [
        'objective',    // 客观题
        'subjective'    // 主观题
      ]
    },
    description: String,    // 允许使用 Markdown
    answer: [String],
    // 如果为客观题，则存储的是各个选项的编号，并且如果多于一个则成为多选题；
    // 如果为主观题，则存储的是候选答案，并且如果多于一个则该题答案不唯一；
    // 如果为空，则默认为由教师自行检阅
    createTime: Date,
    deleted: {
      type: Boolean,
      default: false
    },
    provideTo: [{
      type: ObjectId,
      ref: 'Provide',
      index: true
    }]
  });

  let TestSchema = mongoose.Schema({
    owner: {
      type: ObjectId,
      ref: 'Account'
    },
    forkFrom: {
      type: ObjectId,
      ref: 'Test'
    },
    questions: [{
      type: ObjectId,
      ref: 'Question'
    }],
    createTime: Date,
    beginAt: Date,
    endAt: Date,
    deleted: {
      type: Boolean,
      default: false
    },
    provideTo: ProvideSchema
  });

  let AccountHistorySchema = mongoose.Schema({
    practiced: {
      questions: [{
        at: {
          type: ObjectId,
          ref: 'Question'
        },
        timeLine: [{
          time: Date,
          answer: String
        }]
      }],
      test: [{
        at: {
          type: ObjectId,
          ref: 'Test'
        },
        timeLine: [{
          time: Date,
          answer: String
        }]
      }]
    },
    picked: [{
      teacher: {
        type: ObjectId,
        ref: 'Account'
      },
      timeLine: [Date]
    }]
  });

  let ThemeSchema = mongoose.Schema({
    picture: String,        // BASE64
    isVR: {
      type: Boolean,
      default: false,
      index: true
    },
    primaryColor: String,
    secondaryColor: String,
    opacity: Number,
    mobileTheme: {
      type: String,
      enum: [
        'android',
        'ios'
      ],
      index: true
    }
  });

  let BroadcastSchema = mongoose.Schema({
    whoCanView: [{
      type: ObjectId,
      ref: 'UserGroup'
    }],                     // 如果为空，则所有人都看得到
    date: {
      type: Date,
      index: true
    },
    message: String,        // 允许使用 Markdown
    title: String
  });

  let GlobalUserGroupSchema = mongoose.Schema({
    name: {
      type: String,
      index: true
    },
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema
  });

  let UserGroupSchema = mongoose.Schema({
    extendBy: {
      type: ObjectId,
      ref: 'GlobalUserGroup'
    },
    name: {
      type: String,
      index: true
    },
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema
  });

  let GroupScoreWeightSchema = mongoose.Schema({
    scoreType: {
      type: ObjectId,
      ref: 'ScoreType',
      index: true
    },
    expression: String       // 为一个以 JavaScript 写的函数代码文本，具体内容需额外设计 API
  });

  let GroupSchema = mongoose.Schema({
    scores: [ScoreSchema],
    name: String,
    description: String,
    members: [{
      account: {
        type: ObjectId,
        ref: 'Account'
      }
    }]
  });

  let GroupTypeSchema = mongoose.Schema({
    userType: {
      type: ObjectId,
      ref: 'UserGroup'
    },
    groups: [GroupSchema],
    name: String,
    groupScoreTransfer: GroupScoreWeightSchema
  });

  let LogSchema = mongoose.Schema({
    action: {
      type: String,
      enum: [
        'scoreAdd',
        'scoreRemove',
        'scoreSet',
        'memberAdd',
        'memberRemove',
        'memberSet'
      ]
    },
    target: PathSchema,
    value: Number,
    reason: String,
    operator: {
      type: ObjectId,
      ref: 'Account'
    },
    time: Date
  });

  let AccountSchema = mongoose.Schema({
    name: {
      type: String,
      index: true
    },
    password: String,       // MD5/SHA3
    userGroup: [{
      type: ObjectId,
      ref: 'UserGroup',
      index: true
    }],
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema,
    classTable: {
      type: ObjectId,
      ref: 'ClassTable'
    },
    theme: {
      type: ObjectId,
      ref: 'Theme'
    },
    config: ConfigSchema,
    accountHistory: AccountHistorySchema
  });

  let ClassMapRowSchema = mongoose.Schema({
    columns: [{
      type: ObjectId,
      ref: "Account"
    }]
  });

  let ClassMapBlockSchema = mongoose.Schema({
    height: Number,
    weight: Number,
    rows: [ClassMapRowSchema]
  })

  let ClassMapSchema = mongoose.Schema({
    height: Number,
    weight: Number,
    blocks: [ClassMapBlockSchema]
  });

  let ClassSchema = mongoose.Schema({
    groupTypes: [GroupTypeSchema],
    members: [{
      account: {
        type: ObjectId,
        ref: 'Account'
      },
      scores: [ScoreSchema]
    }],
    name: {
      type: String,
      index: true
    },
    scores: [ScoreSchema],
    state: ClassStateSchema,
    classTable: {
      type: ObjectId,
      ref: "ClassTable"
    },
    theme: [ThemeSchema],
    classMap: ClassMapSchema
  });

  console.log("数据库表创建完成");


  let Class = db.model('Class', ClassSchema);
  let GroupType = db.model('GroupType', GroupTypeSchema);
  let GroupScoreWeight = db.model('GroupScoreWeight', GroupScoreWeightSchema);
  let Group = db.model('Group', GroupSchema);
  let Log = db.model('Log', LogSchema);
  let Path = db.model('Path', PathSchema);
  let Score = db.model('Score', ScoreSchema);
  let Account = db.model('Account', AccountSchema);
  let ExpressionGroup = db.model('ExpressionGroup', ExpressionGroupSchema);
  let Expression = db.model('Expression', ExpressionSchema);
  let ScoreType = db.model('ScoreType', ScoreTypeSchema);
  let TradeRule = db.model('TradeRule', TradeRuleSchema);
  let UserGroup = db.model('UserGroup', UserGroupSchema);
  let GlobalUserGroup = db.model('GlobalUserGroup', GlobalUserGroupSchema);
  let ScoreGroup = db.model('ScoreGroup', ScoreGroupSchema);
  let ClassTable = db.model('ClassTable', ClassTableSchema);
  let ClassTableItem = db.model('ClassTableItem', ClassTableItemSchema);
  let Config = db.model('Config', ConfigSchema);
  let ClassState = db.model('ClassState', ClassStateSchema);
  let Question = db.model('Question', QuestionSchema);
  let Test = db.model('Test', TestSchema);
  let Provide = db.model('Provide', ProvideSchema);
  let AccountHistory = db.model('AccountHistory', AccountHistorySchema);
  let Theme = db.model('Theme', ThemeSchema);
  let BroadCast = db.model('Broadcast', BroadcastSchema);
  let ClassMap = db.model('ClassMap', ClassMapSchema);
  let ClassMapBlock = db.model('ClassMapBlock', ClassMapBlockSchema);
  let ClassMapRow = db.model('ClassMapRow', ClassMapRowSchema);

  console.log("数据库表格关联完毕");

  connectionEvents.on('h5', conn => {
    console.log("开始注册 h5 的指令……");
    register("h5", {
      database: {
        at: function (...args) {
          args = Array.prototype.slice.call(args);

          // selectors 与 evaluator 下的执行函数会被包装为 Promise
          // 由于 Promise 无法传参，所以在新建 Promise 时会先调用外层的工厂函数，得到的内部函数才能交给 Promise 正常使用
          const selectors = {
            // 根表选择器
            "classes": {
              argsCount: 1,
              func: (db, id) => Class.findOne({ _id: id })
            },
            "accounts": {
              argsCount: 1,
              func: (db, id) => Account.findOne({ id: id })
            },
            "broadcasts": {
              argsCount: 1,
              func: (db, id) => BroadCast.findOne({ id: id })
            },
            "classTables": {
              argsCount: 1,
              func: (db, id) => ClassTable.findOne({ id: id })
            },
            "globalUserGroups": {
              argsCount: 1,
              func: (db, id) => GlobalUserGroup.findOne({ id: id })
            },
            "userGroup": {
              argsCount: 1,
              func: (db, id) => UserGroup.findOne({ id: id })
            },
            "groupType": {
              argsCount: 1,
              func: (db, id) => GroupType.findOne({ id: id })
            },
            "theme": {
              argsCount: 1,
              func: (db, id) => Theme.findOne({ id: id })
            },
            "question": {
              argsCount: 1,
              func: (db, id) => Question.findOne({ id: id })
            },
            "test": {
              argsCount: 1,
              func: (db, id) => Test.findOne({ id: id })
            },
            "scoreGroup": {
              argsCount: 1,
              func: (db, id) => ScoreGroup.findOne({ id: id })
            },
            "scoreType": {
              argsCount: 1,
              func: (db, id) => ScoreType.findOne({ id: id })
            }
          }

          const evaluators = {
            "get": {
              argsCount: 1,
              func: (db, objName) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", "" + err);
                  if (doc && doc[objName]) resolve(objName + " " + doc[objName]);
                  else console.log(doc), reject("没有这个值！");
                });
              }
            },
            "set": {
              argsCount: 2,
              func: (db, objName, value) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", "" + err);

                  if (!doc)
                    return reject("数据库保存失败，压根就没查到你要的表！");
                  else if (!doc[objName])
                    return reject("数据库保存失败，理由是没有这个键：" + objName);
                  else if (Array.isArray(doc[objName]))
                    return reject("数据库保存失败，理由是 set 无法处理数组的操作：" + objName);

                  doc[objName] = value;

                  doc.save(err => {
                    if (err) reject("数据库保存失败！（也许是没有权限？）：" + err);
                    else resolve(objName + " " + "ok");
                  });
                });
              }
            },
            "add": {
              argsCount: 2,
              func: (db, objName, value) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", "" + err);

                  if (!doc)
                    return reject("数据库保存失败，压根就没查到你要的表！");
                  else if (!doc[objName])
                    return reject("数据库保存失败，理由是没有这个键：" + objName);
                  else if (!Array.isArray(doc[objName]))
                    return reject("数据库保存失败，理由是 add 无法处理非数组的操作：" + objName);

                  if (!doc.indexOf(objName)) doc[objName].push(value);
                  else reject("已经有这个元素了！");

                  doc.save(err => {
                    if (err) reject("数据库保存失败！（也许是没有权限？）：" + err);
                    else resolve(objName + " " + "ok");
                  });
                })
              }
            },
            "remove": {
              argsCount: 2,
              func: (db, objName, value) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", "" + err);

                  if (!doc)
                    return reject("数据库保存失败，压根就没查到你要的表！");
                  else if (!doc[objName])
                    return reject("数据库保存失败，理由是没有这个键：" + objName);
                  else if (!Array.isArray(doc[objName]))
                    return reject("数据库保存失败，理由是 remove 无法处理非数组的操作：" + objName);

                  doc[objName] = doc[objName].filter(n => n.id != value);
                  console.log(doc[objName]);

                  doc.save(err => {
                    if (err) reject("数据库保存失败！（也许是没有权限？）：" + err);
                    else resolve(objName + " " + "ok");
                  });
                })
              }
            },
            "list": {
              argsCount: 3,
              func: (db, objName, numberRound, selection) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", "" + err);

                  if (!doc)
                    return reject("数据库保存失败，压根就没查到你要的表！");
                  else if (!doc[objName])
                    return reject("数据库保存失败，理由是没有这个键：" + objName);
                  else if (!Array.isArray(doc[objName]))
                    return reject("数据库保存失败，理由是 list 无法处理非数组的操作：" + objName);

                  if (!numberRound || !selection)
                    return reject("数据库操作失败，你传输的参数有问题！"); 

                  let match = /^([0-9]+)\.\.([0-9]*)$/.exec(numberRound);
                  console.log("参数解析结果：", match);
                  console.log('objName:', objName);
                  let list = selection == "id"
                    ? doc[objName].map(n => {
                      n = n.toObject();
                      let str = "";
                      for(let i = 0; i < 24; ++i) str += n["" + i];
                      return str;
                    })
                    : doc[objName].map(n => n[selection]);
                  console.log("列表解析结果：", list);
                  if (match[2]) {
                    list = list.slice(+match[1], +match[2] + 1);
                  } else {
                    list = list.slice(+match[1]);
                  }
                  let str = list.reduce((prev, next) => prev + " " + next);
                  resolve(objName + " " + str);
                })
              }
            },
            "count": {
              argsCount: 1,
              func: (db, objName) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", "" + err);

                  if (!doc)
                    return reject("数据库保存失败，压根就没查到你要的表！");
                  else if (!doc[objName])
                    return reject("数据库保存失败，理由是没有这个键：" + objName);
                  else if (!Array.isArray(doc[objName]))
                    return reject("数据库保存失败，理由是 count 无法处理非数组的操作：" + objName);

                  resolve(objName + " " + doc[objName].length);
                })
              }
            },
          }

          const run_evaluator = (db, args) => {
            if (evaluators[args[0]]) {
              new Promise(
                evaluators[args[0]].func.apply(null, [db].concat(args.slice(1)))
              ).then(
                res => this.send("success", res)
              ).catch(
                err => this.send("fail", "" + err)
              );
            }
            else this.send("不存在这个执行方法！", args[0]);
          }

          // 开始递归 selector
          const dfs_selector = (db, args) => {
            if (args[0] == "run") {
              console.log("即将传入 evaluator 的指令：", args.slice(1));
              return run_evaluator(db, args.slice(1));
            };
            if (selectors[args[0]]) {
              console.log("即将传入新一轮 selector 的指令：", args.slice(1 + selectors[args[0]].argsCount));
              dfs_selector(
                selectors[args[0]].func.apply(null, [db].concat(args.slice(1, 1 + selectors[args[0]].argsCount))),
                args.slice(1 + selectors[args[0]].argsCount)
              );
            }
            else this.send("不存在这个选择器！", args[0]);
          }
          dfs_selector(db, args);
        },
        list: function (...args) {
          args = Array.prototype.slice.call(args);

          // selectors 与 evaluator 下的执行函数会被包装为 Promise
          // 由于 Promise 无法传参，所以在新建 Promise 时会先调用外层的工厂函数，得到的内部函数才能交给 Promise 正常使用
          const selectors = {
            // 根表选择器
            "classes": {
              argsCount: 0,
              func: () => Class.find({})
            },
            "accounts": {
              argsCount: 0,
              func: () => Account.find({})
            },
            "broadcasts": {
              argsCount: 0,
              func: () => BroadCast.find({})
            },
            "classTables": {
              argsCount: 0,
              func: () => ClassTable.find({})
            },
            "globalUserGroups": {
              argsCount: 0,
              func: () => GlobalUserGroup.find({})
            },
            "userGroups": {
              argsCount: 0,
              func: () => UserGroup.find({})
            },
            "groupTypes": {
              argsCount: 0,
              func: () => GroupType.find({})
            },
            "themes": {
              argsCount: 0,
              func: () => Theme.find({})
            },
            "questions": {
              argsCount: 0,
              func: () => Question.find({})
            },
            "tests": {
              argsCount: 0,
              func: () => Test.find({})
            },
            "scoreGroups": {
              argsCount: 0,
              func: () => ScoreGroup.find({})
            },
            "scoreTypes": {
              argsCount: 0,
              func: () => ScoreType.find({})
            }
          }

          const evaluators = {
            "list": {
              argsCount: 1,
              func: (db, numberRound) => (resolve, reject) => {
                let match = /^([0-9]+)\.\.([0-9]*)$/.exec(numberRound);
                if (match[2]) {
                  db.skip(+match[1]).limit(+match[2] - match[1]).exec((err, doc) => {
                    if (err) this.send("fail", "" + err);

                    if (!doc)
                      return reject("数据库查询失败，压根就没查到你要的表！");

                    let ret = doc.map(n => n.id.toString());
                    resolve(ret);
                  });
                } else {
                  db.skip(+match[1]).exec((err, doc) => {
                    if (err) this.send("fail", "" + err);

                    if (!doc)
                      return reject("数据库查询失败，压根就没查到你要的表！");

                    let ret = doc.map(n => n.id.toString());
                    resolve(ret);
                  });
                }
              }
            },
            "count": {
              argsCount: 0,
              func: (db) => (resolve, reject) => {
                db.count((err, num) => {
                  if (err) this.send("fail", "" + err);

                  resolve(num);
                })
              }
            },
          }

          const run_evaluator = (db, args) => {
            if (evaluators[args[0]]) {
              new Promise(
                evaluators[args[0]].func.apply(null, [db].concat(args.slice(1)))
              ).then(
                res => this.send("success", res)
              ).catch(
                err => this.send("fail", "" + err)
              );
            }
            else this.send("不存在这个执行方法！", args[0]);
          }

          // 开始递归 selector
          const dfs_selector = (db, args) => {
            if (args[0] == "run") {
              console.log("即将传入 evaluator 的指令：", args.slice(1));
              return run_evaluator(db, args.slice(1));
            };
            if (selectors[args[0]]) {
              console.log("即将传入新一轮 selector 的指令：", args.slice(1 + selectors[args[0]].argsCount));
              dfs_selector(
                selectors[args[0]].func.apply(null, [db].concat(args.slice(1, 1 + selectors[args[0]].argsCount))),
                args.slice(1 + selectors[args[0]].argsCount)
              );
            }
            else this.send("不存在这个选择器！", args[0]);
          }
          dfs_selector(db, args);
        }
      }
    });
  });
});
