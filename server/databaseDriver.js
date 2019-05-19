import mongoose from "./databaseInitializer";
import { send, register, receive, connectionEvents } from "./webSocketServer";

let db = mongoose.createConnection('mongodb://localhost/test');

db.on('error', e => console.error(e));
db.on('open', () => console.log("数据库连接成功"));

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
    name: String,
    description: String,
    tradeRules: [TradeRuleSchema],
    virtual: Boolean    // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息
});

let ScoreGroupSchema = mongoose.Schema({
    name: String,
    description: String,
    usingScoreTypes: [{
        type: ObjectId,
        ref: 'ScoreType'
    }]
});

let ClassTableItemSchema = mongoose.Schema({
    form: Date,
    to: Date,
    subject: String
});

let ClassTableSchema = mongoose.Schema({
    description: String,
    name: String,
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
    classes: [{
        type: ObjectId,
        ref: "Class"
    }]
});

let QuestionSchema = mongoose.Schema({
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
    },
    provideTo: ProvideSchema
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

let BroadcastSchema = mongoose.Schema({
    whoCanView: [{
        type: ObjectId,
        ref: 'UserGroup'
    }],                     // 如果为空，则所有人都看得到
    date: Date,
    message: String         // 允许使用 Markdown
});

let GlobalUserGroupSchema = mongoose.Schema({
    name: String,
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema
});

let UserGroupSchema = mongoose.Schema({
    extendBy: {
        type: ObjectId,
        ref: 'GlobalUserGroup'
    },
    name: String,
    scoreExpression: ExpressionGroupSchema,
    userExpression: ExpressionGroupSchema
});

let GroupScoreWeightSchema = mongoose.Schema({
    scoreType: {
        type: ObjectId,
        ref: 'ScoreType'
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

let ClassSchema = mongoose.Schema({
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
    classTable: {
        type: ObjectId,
        ref: "ClassTable"
    },
    theme: [ThemeSchema]
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
mongoose.model('Provide', ProvideSchema);
mongoose.model('AccountHistory', AccountHistorySchema);
mongoose.model('Theme', ThemeSchema);
mongoose.model('Broadcast', BroadcastSchema);

console.log("数据库创建完成");

connectionEvents.on('h5', conn => {
    console.log("开始注册 h5 的指令……");
    register("h5", {
        list: {
            school: {
                classes: () => "123123",
                scoreTypes: (a, b) => a + b
            }
        }
    });
})