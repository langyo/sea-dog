const mongoose = eval('require\("mongoose"\)');

let db = mongoose.createConnection('mongodb://localhost/test');

db.on('error', e => console.error(e));

export default new Promise(resolve => {
  db.on('open', () => {
    console.log('数据库连接成功');

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
        ref: 'ScoreType'
      },
      value: Number
    });

    let ExpressionSchema = mongoose.Schema({
      path: {
        type: ObjectId,
        ref: 'Path'
      },
      tag: Boolean
    });

    let ExpressionGroupSchema = mongoose.Schema({
      read: [{
        type: ObjectId,
        ref: 'Expression'
      }],
      write: [{
        type: ObjectId,
        ref: 'Expression'
      }],
      add: [{
        type: ObjectId,
        ref: 'Expression'
      }],
      minus: [{
        type: ObjectId,
        ref: 'Expression'
      }]
    });

    let TradeRuleSchema = mongoose.Schema({
      from: {
        type: ObjectId,
        ref: 'ScoreType'
      },
      to: {
        type: ObjectId,
        ref: 'ScoreType'
      },
      weightFrom: Number,
      weightTo: Number,
      weightDecimalPartRule: {
        type: String,
        enum: ['toZero', 'toOne', 'nearly']     // 分别代表抹零、进一和四舍五入
      }
    });

    let ScoreTypeSchema = mongoose.Schema({
      name: {
        type: String,
        index: true
      },
      description: String,
      tradeRules: [{
        type: ObjectId,
        ref: 'TradeRule'
      }],
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
      timeLine: [{
        type: ObjectId,
        ref: 'ClassTableItem'
      }],
      userType: {
        type: String,
        enum: ['student', 'teacher']
      }
    });

    let ConfigSchema = mongoose.Schema({
      'createQuestion': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'forkQuestion': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'deleteQuestion': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'createTest': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'watchTestResult': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'forkTest': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'deleteTest': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'setTheme': {
        type: String,
        enum: ['enable', 'disable', 'default']
      },
      'root': {
        type: String,
        enum: ['enable', 'disable', 'default']
      }
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

    let ProviderSchema = mongoose.Schema({
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

    let AnswerSchema = mongoose.Schema({
      answer: String
    })

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
      answer: [{
        type: ObjectId,
        ref: 'Answer'
      }],
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
      provideTo: {
        type: ObjectId,
        ref: 'Provide'
      }
    });

    let AccountHistoryQuestionItemSchema = mongoose.Schema({
      time: Date,
      answer: String
    });

    let AccountHistoryQuestionSchema = mongoose.Schema({
      at: {
        type: ObjectId,
        ref: 'Question'
      },
      timeLine: [{
        type: ObjectId,
        ref: 'AccountHistoryQuestionItem'
      }]
    });

    let AccountHistoryTestItemSchema = mongoose.Schema({
      time: Date,
      answer: String
    });

    let AccountHistoryTestSchema = mongoose.Schema({
      at: {
        type: ObjectId,
        ref: 'Test'
      },
      timeLine: [{
        type: ObjectId,
        ref: 'AccountHistoryTestItem'
      }]
    });

    let DateSchema = mongoose.Schema({
      date: Date
    });

    let PickedHistorySchema = mongoose.Schema({
      teacher: {
        type: ObjectId,
        ref: 'Account'
      },
      timeLine: [{
        type: ObjectId,
        ref: 'Date'
      }]
    });

    let AccountHistorySchema = mongoose.Schema({
      practisedQuestions: [{
        type: ObjectId,
        ref: 'AccountHistoryQuestion'
      }],
      practisedTest: [{
        type: ObjectId,
        ref: 'AccountHistoryTest'
      }],
      picked: [{
        type: ObjectId,
        ref: 'PickedHistory'
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
      scoreExpression: {
        type: ObjectId,
        ref: 'ExpressionGroup'
      },
      userExpression: {
        type: ObjectId,
        ref: 'ExpressionGroup'
      }
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
      scoreExpression: {
        type: ObjectId,
        ref: 'ExpressionGroup'
      },
      userExpression: {
        type: ObjectId,
        ref: 'ExpressionGroup'
      }
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
      groups: [{
        type: ObjectId,
        ref: 'Group'
      }],
      name: String,
      groupScoreTransfer: {
        type: ObjectId,
        ref: 'GroupScoreWeight'
      }
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
      scoreExpression: {
        type: ObjectId,
        ref: 'ExpressionGroup'
      },
      userExpression: {
        type: ObjectId,
        ref: 'ExpressionGroup'
      },
      classTable: {
        type: ObjectId,
        ref: 'ClassTable'
      },
      theme: {
        type: ObjectId,
        ref: 'Theme'
      },
      config: {
        type: ObjectId,
        ref: 'Config'
      },
      accountHistory: {
        type: ObjectId,
        ref: 'AccountHistory'
      }
    });

    let ClassMapRowSchema = mongoose.Schema({
      columns: [{
        type: ObjectId,
        ref: 'Account'
      }]
    });

    let ClassMapBlockSchema = mongoose.Schema({
      height: Number,
      weight: Number,
      rows: [{
        type: ObjectId,
        ref: 'ClassMapRow'
      }]
    })

    let ClassMapSchema = mongoose.Schema({
      height: Number,
      weight: Number,
      blocks: [{
        type: ObjectId,
        ref: 'ClassMapBlock'
      }]
    });

    let ClassSchema = mongoose.Schema({
      groupTypes: [{
        type: ObjectId,
        ref: 'GroupType'
      }],
      members: [{
        account: {
          type: ObjectId,
          ref: 'Account'
        },
        scores: [{
          type: ObjectId,
          ref: 'Score'
        }]
      }],
      name: {
        type: String,
        index: true
      },
      scores: [{
        type: ObjectId,
        ref: 'Score'
      }],
      state: {
        type: ObjectId,
        ref: 'ClassState'
      },
      classTable: {
        type: ObjectId,
        ref: 'ClassTable'
      },
      theme: [{
        type: ObjectId,
        ref: 'Theme'
      }],
      classMap: {
        type: ObjectId,
        ref: 'ClassMap'
      }
    });

    resolve({
       classes: db.model('Class', ClassSchema),
       groupTypes: db.model('GroupType', GroupTypeSchema),
       groupScoreWeights: db.model('GroupScoreWeight', GroupScoreWeightSchema),
       groups: db.model('Group', GroupSchema),
       logs: db.model('Log', LogSchema),
       paths: db.model('Path', PathSchema),
       scores: db.model('Score', ScoreSchema),
       accounts: db.model('Account', AccountSchema),
       expressionGroups: db.model('ExpressionGroup', ExpressionGroupSchema),
       expressions: db.model('Expression', ExpressionSchema),
       scoreTypes: db.model('ScoreType', ScoreTypeSchema),
       tradeRules: db.model('TradeRule', TradeRuleSchema),
       userGroups: db.model('UserGroup', UserGroupSchema),
       globalUserGroups: db.model('GlobalUserGroup', GlobalUserGroupSchema),
       scoreGroups: db.model('ScoreGroup', ScoreGroupSchema),
       classTables: db.model('ClassTable', ClassTableSchema),
       classTableItems: db.model('ClassTableItem', ClassTableItemSchema),
       configs: db.model('Config', ConfigSchema),
       classStates: db.model('ClassState', ClassStateSchema),
       answers: db.model('Answer', AnswerSchema),
       questions: db.model('Question', QuestionSchema),
       tests: db.model('Test', TestSchema),
       providers: db.model('Provider', ProviderSchema),
       accountHistoryQuestionItems: db.model('AccountHistoryQuestionItem', AccountHistoryQuestionItemSchema),
       accountHistoryQuestions: db.model('AccountHistoryQuestion', AccountHistoryQuestionSchema),
       accountHistoryTestItems: db.model('AccountHistoryTestItem', AccountHistoryTestItemSchema),
       accountHistoryTests: db.model('AccountHistoryTest', AccountHistoryTestSchema),
       dates: db.model('Date', DateSchema),
       pickedHistorys: db.model('PickedHistory', PickedHistorySchema),
       accountHistorys: db.model('AccountHistory', AccountHistorySchema),
       themes: db.model('Theme', ThemeSchema),
       broadcasts: db.model('Broadcast', BroadcastSchema),
       classMaps: db.model('ClassMap', ClassMapSchema),
       classMapBlocks: db.model('ClassMapBlock', ClassMapBlockSchema),
       classMapRows: db.model('ClassMapRow', ClassMapRowSchema),
    }),
      console.log('数据库初始化完毕');
  });
});