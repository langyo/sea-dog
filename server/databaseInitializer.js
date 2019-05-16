import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

let db = mongoose.createConnection('mongodb://localhost/test');

db.on('error', e => console.error(e));
db.on('open', () => console.log("连接成功"));

// 主键列表：
// classes: [Class],
// accounts: [Account],
// scoreTypes: [ScoreType],
// userGroups: [UserGroup],
// globalUserGroups: [GlobalUserGroup],
// scoreGroups: [ScoreGroup],
// classTables: [ClassTable],
// subjectEnum: [String],
// broadcasts: [Broadcast],
// questionLibrary: [Question],
// testLibrary: [Test],
// log: [Log]

var PathSchema = mongoose.Schema({
    theClass: String,
    groupType: String,
    group: String,
    member: String
});

var ScoreSchema = mongoose.Schema({
    at: ObjectId,
    value: Number
});

var ExpressionSchema = mongoose.Schema({
    path: PathSchema,
    tag: Boolean
});

var ExpressionGroupSchema = mongoose.Schema({
    read: [ExpressionSchema],
    write: [ExpressionSchema],
    add: [ExpressionSchema],
    minus: [ExpressionSchema]
});

var TradeRuleSchema = mongoose.Schema({
    from: ObjectId,
    to: ObjectId,
    weight: {
        from: Number,
        to: Number,
        decimalPartRule: {
            type: String,
            enum: ['toZero', 'toOne', 'nearly']     // 分别代表抹零、进一和四舍五入
        }
    }
});

var ScoreTypeSchema = mongoose.Schema({
    name: String,
    description: String,
    tradeRules: [TradeRuleSchema],
    virtual: Boolean    // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息
});

var ScoreGroupSchema = mongoose.Schema({
    name: String,
    description: String,
    usingScoreTypes: [{
        type: ObjectId,
        ref: 'ScoreType'
    }]
});

var ClassTableItemSchema = mongoose.Schema({
    form: Date,
    to: Date,
    subject: String
});

var ClassTableSchema = mongoose.Schema({
    description: String,
    name: String,
    timeLine: [ClassTableItemSchema],
    userType: {
        type: String,
        enum: ['student', 'teacher']
    }
});

var ConfigSchema = mongoose.Schema({
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
});

var ClassStateSchema = mongoose.Schema({
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

var QuestionSchema = mongoose.Schema({
    owner: {
        type: ObjectId,
        ref: 'Account'
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
    }
});

var TestSchema = mongoose.Schema({
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
    }
});

var AccountHistorySchema = mongoose.Schema({
    practised: {
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

var ThemeSchema = mongoose.Schema({
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
});

var BroadcastSchema = mongoose.Schema({
    whoCanView: [{
        type: ObjectId,
        ref: 'UserGroup'
    }],                     // 如果为空，则所有人都看得到
    date: Date,
    message: String         // 允许使用 Markdown
});

var GlobalUserGroupSchema = mongoose.Schema({
    name: String,
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema
});

var UserGroupSchema = mongoose.Schema({
    extendBy: {
        type: ObjectId,
        ref: 'GlobalUserGroup'
    },
    name: String,
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema
});

var GroupScoreWeightSchema = mongoose.Schema({
    scoreType: {
        type: ObjectId,
        ref: 'ScoreType'
    },
    expression: String       // 为一个以 JavaScript 写的函数代码文本，具体内容需额外设计 API
});

var GroupSchema = mongoose.Schema({
    scores: [ScoreSchema],
    members: [{
        account: {
            type: ObjectId,
            ref: 'Account'
        }
    }]
});

var GroupTypeSchema = mongoose.Schema({
    userType: {
        type: ObjectId,
        ref: 'UserGroup'
    },
    group: [GroupSchema],
    name: String,
    groupScoreTransfer: GroupScoreWeightSchema
});

var LogSchema = mongoose.Schema({
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

var AccountSchema = mongoose.Schema({
    name: String,
    password: String,       // MD5/SHA3
    userGroup: [{
        type: ObjectId,
        ref: 'UserGroup'
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

var ClassSchema = mongoose.Schema({
    groupTypes: [GroupTypeSchema],
    members: [{
        account: {
            type: ObjectId,
            ref: 'Account'
        },
        scores: [ScoreSchema]
    }],
    name: String,
    scores: [ScoreSchema],
    state: ClassStateSchema,
    classTable: ObjectId,
    Theme: [ThemeSchema]
});

mongoose.model('Class', ClassSchema);
mongoose.model('GroupType', GroupTypeSchema);
mongoose.model('GroupScoreWeight', GroupScoreWeightSchema);
mongoose.model('Group', GroupSchema);
mongoose.model('Log', LogSchema);
mongoose.model('Path', PathSchema);
mongoose.model('Score', ScoreSchema);
mongoose.model('Account', AccountSchema);
mongoose.model('ExpressionGroup', ExpressionGroupSchema);
mongoose.model('Expression', ExpressionSchema);
mongoose.model('ScoreType', ScoreTypeSchema);
mongoose.model('TradeRule', TradeRuleSchema);
mongoose.model('UserGroup', UserGroupSchema);
mongoose.model('GlobalUserGroup', GlobalUserGroupSchema);
mongoose.model('ScoreGroup', ScoreGroupSchema);
mongoose.model('ClassTable', ClassTableSchema);
mongoose.model('ClassTableItem', ClassTableItemSchema);
mongoose.model('Config', ConfigSchema);
mongoose.model('ClassState', ClassStateSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Test', TestSchema);
mongoose.model('AccountHistory', AccountHistorySchema);
mongoose.model('Theme', ThemeSchema);
mongoose.model('Broadcast', BroadcastSchema);

console.log("数据库创建完毕");