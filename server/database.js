const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;

db.on('error', e => console.error(e));
db.on('open', () => console.log("success"));

var School = mongoose.model('School', mongoose.Schema({
    classes: [Class],
    accounts: [Account],
    scoreTypes: [ScoreType],
    userGroups: [UserGroup],
    globalUserGroups: [{
        name: String,
        scoreExpression: ExpressionGroup,
        userExpression: ExpressionGroup
    }],
    scoreGroups: [ScoreGroup],
    classTables: [ClassTable],
    subjectEnum: [String],
    broadcasts: [Broadcast],
    questionLibrary: [Question],
    testLibrary: [Test],
    log: [Log]
}));

var Class = mongoose.model('Class', mongoose.Schema({
    groupTypes: [GroupType],
    members: [{
        account: ObjectId,    // -> School.accounts
        scores: [Score]
    }],
    name: String,
    scores: [Score],
    state: ClassState,
    classTable: ObjectId,
    Theme: [Theme]
}));

var GroupType = mongoose.model('GroupType', mongoose.Schema({
    userType: ObjectId,       // -> School.userGroups
    group: [Group],
    name: String,
    groupScoreTransfer: GroupScoreWeight
}));

var GroupScoreWeight = mongoose.model('GroupScoreWeight', mongoose.Schema({
    scoreType: ObjectId,     // -> School.scoreTypes
    expression: String       // 为一个以 JavaScript 写的函数代码文本，具体内容需额外设计 API
}))

var Group = mongoose.model('Group', mongoose.Schema({
    scores: [Score],
    members: [{
        account: ObjectId,  // -> School.accounts
        log: [Log]
    }]
}));

var Log = mongoose.model('Log', mongoose.Schema({
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
    target: Path,
    value: Number,
    reason: String,
    operator: ObjectId,     // -> School.accounts
    time: Date
}));

var Path = mongoose.model('Path', mongoose.Schema({
    theClass: String,
    groupType: String,
    group: String,
    member: String
}));

var Score = mongoose.model('Score', mongoose.Schema({
    at: ObjectId,
    value: Number
}));

var Account = mongoose.model('Account', mongoose.Schema({
    name: String,
    password: String,       // MD5/SHA3
    userGroup: [ObjectId],  // -> School.userGroups
    scoreExpression: ExpressionGroup,
    userExpression: ExpressionGroup,
    classTable: ObjectId,   // -> School.classTables
    theme: ObjectId,        // -> School.themes
    config: Config,
    accountHistory: AccountHistory
}));

var ExpressionGroup = mongoose.model('ExpressionGroup', mongoose.Schema({
    read: [Expression],
    write: [Expression],
    add: [Expression],
    remove: [Expression]
}));

var Expression = mongoose.model('Expression', mongoose.Schema({
    path: Path,
    tag: Boolean
}));

var ScoreType = mongoose.model('ScoreType', mongoose.Schema({
    name: String,
    description: String,
    tradeRules: [TradeRule],
    virtual: Boolean        // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息
}));

var TradeRule = mongoose.model('TradeRule', mongoose.Schema({
    from: ObjectId,
    to: ObjectId,
    weight: {
        from : Number,
        to: Number,
        decimalPartRule: {
            type: String,
            enum: ['toZero', 'toOne', 'nearly']     // 分别代表抹零、进一和四舍五入
        }
    }
}));

var UserGroup = mongoose.model('UserGroup', mongoose.Schema({
    extendBy: ObjectId,     // -> School.globalUserGroups
    name: String,
    scoreExpression: ExpressionGroup,
    userExpression: ExporessionGroup
}));

var ScoreGroup = mongoose.model('ScoreGroup', mongoose.Schema({
    name: String,
    description: String,
    usingScoreTypes: [ObjectId]
                            // -> School.scoreTypes
}));

var ClassTable = mongoose.model('ClassTable', mongoose.Schema({
    description: String,
    name: String,
    timeLine: [ClassTableItem],
    userType: {
        type: String,
        enum: ['student', 'teacher']
    }
}));

var ClassTableItem = mongoose.model('ClassTableItem', mongoose.Schema({
    form: Date,
    to: Date,
    subject: ObjectId       // -> School.subjectEnum
}));

var Config = mongoose.model('Config', mongoose.Schema({
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
            'setTheme'
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
            'setTheme'
        ]
    }]
}));

var ClassState = mongoose.model('ClassState', mongoose.Schema({
    isHavingClass: {
        type: String,
        enum: [
            'begin',    // 正常上课
            'over',     // 下课
            'continue'  // 拖堂
        ]
    },
    nowTeacher: ObjectId    // -> School.accounts
}));

var Question = mongoose.model('Question', mongoose.Schema({
    owner: ObjectId,        // -> School.accounts
    forkFrom: ObjectId,     // -> School.questions
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
    }
}));

var Test = mongoose.model('Test', mongoose.Schema({
    owner: ObjectId,        // -> School.accounts
    forkFrom: ObjectId,     // -> School.testLibrary
    questions: [ObjectId],  // -> School.questionLibrary
    createTime: Date,
    beginAt: Date,
    endAt: Date,
    deleted: {
        type: Boolean,
        default: false
    }
}));

var AccountHistory = mongoose.model('AccountHistory', mongoose.Schema({
    practised: {
        questions: [{
            at: ObjectId,   // -> School.questionLibrary
            timeLine: [{
                time: Date,
                answer: String
            }]
        }],
        test: [{
            at: ObjectId,   // -> School.testLibrary
            timeLine: [{
                time: Date,
                answer: String
            }]
        }]
    },
    picked: [{
        teacher: ObjectId,  // -> School.accounts,
        timeLine: [Date]
    }]
}));

var Theme = mongoose.model('Theme', mongoose.Schema({
    picture: String,        // BASE64
    isVR: {
        type: Boolean,
        default: false
    },
    primaryColor: String,
    secondaryColor: String,
    opacity: Number,
    mobileTheme: {
        type: String,
        enum: [
            'android',
            'ios'
        ]
    }
}));

var Broadcast = mongoose.model('Broadcast', mongoose.Schema({
    whoCanView: [ObjectId], // -> School.userGroups
                            // 如果为空，则所有人都看得到
    date: Date,
    message: String         // 允许使用 Markdown
}));

console.log("数据库创建完毕");