const mongoose = eval('require\("mongoose"\)');
import { send, register, receive, connectionEvents } from "./webSocketServer";

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
          const dfs = (args, doc) => {
            if (args.length > 0)
              if (doc == undefined) {
                // 从数据库直接检索
                switch (args[0]) {
                  case 'class':
                    // 格式： class <班级编号>
                    Class.findOne({ id: args[1] }).exec(
                      (err, res) => {
                        if (err) {
                          console.log(err);
                          this.send('fail');
                        }
                        dfs(args.slice(2), res);
                      }
                    );
                    break;
                  case 'account':
                    // 格式： account <账户编号>
                    Account.findOne({ id: args[1] }).exec(
                      (err, res) => {
                        if (err) {
                          console.log(err);
                          this.send('fail');
                          return;
                        }
                        dfs(args.slice(2), res);
                      }
                    );
                    break;
                  case 'test':
                    // 格式： test <考试编号>
                    Test.findOne({ id: args[1] }).exec(
                      (err, res) => {
                        if (err) {
                          console.log(err);
                          this.send('fail');
                          return;
                        }
                        dfs(args.slice(2), res);
                      }
                    );
                    break;
                  case 'question':
                    // 格式： question <题目编号>
                    Question.findOne({ id: args[1] }).exec(
                      (err, res) => {
                        if (err) {
                          console.log(err);
                          this.send('fail');
                          return;
                        }
                        dfs(args.slice(2), res);
                      }
                    );
                    break;
                  case 'broadcast':
                    // 格式： broadcast <广播编号>
                    BroadCast.findOne({ id: args[1] }).exec(
                      (err, res) => {
                        if (err) {
                          console.log(err);
                          this.send('fail');
                          return;
                        }
                        dfs(args.slice(2), res);
                      }
                    );
                    break;
                }
              } else {
                // 从已有的 doc 检索
                switch (args[0]) {
                  case 'groupType':
                    // 格式： groupType <名称>
                    dfs(args.slice(2), doc.population('GroupType').groupTypes[args[1]]);
                }
              }
          }
        },
        list: function (name, cmd, ...args) {
          switch (cmd) {
            case 'count':
              switch (name) {
                case 'classes':
                  Class.find({}).count((err, num) => {
                    if (err) {
                      console.log(err);
                      this.send('fail');
                      return;
                    }
                    this.send(num)
                  });
                case 'accounts':
                  Account.find({}).count((err, num) => {
                    if (err) {
                      console.log(err);
                      this.send('fail');
                      return;
                    }
                    this.send(num)
                  });
                case 'broadcasts':
                  BroadCast.find({}).count((err, num) => {
                    if (err) {
                      console.log(err);
                      this.send('fail');
                      return;
                    }
                    this.send(num)
                  });
              }
          }
        }
      },
    });
  });
});
