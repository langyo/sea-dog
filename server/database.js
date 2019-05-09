const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;

db.on('error', e => console.error(e));
db.on('open', () => console.log("success"));

// TODO: mongoose.model('XXX', SchemaObject);

var School = mongoose.Schema({
    classes: [Class],
    accounts: [Account],
    scoreTypes: [ScoreType],
    userGroups: [UserGroup],
    globalUserGroups: [{
        name: String,
        scoreExpression: ExpressionGroup,
        userExpression: ExporessionGroup
    }],
    scoreGroups: [ScoreGroup]
});

var Class = mongoose.Schema({
    groupTypes: [GroupType],
    members: [{
        account: ObjectId,
        scores: [Score],
        log: [Log]
    }],
    name: String
});

var GroupType = mongoose.Schema({
    type: ObjectId,
    group: [Group],
    name: String
});

var Group = mongoose.Schema({
    scores: [Score],
    log: [Log],
    members: [{
        account: ObjectId,
        log: [Log]
    }]
});

var Log = mongoose.Schema({
    value: Number,
    reason: String,
    operator: ObjectId,
    time: Date
});

var Score = mongoose.Schema({
    at: ObjectId,
    value: Number
});

var Account = mongoose.Schema({
    name: String,
    password: String,   // MD5/SHA3
    userGroup: ObjectId,
    scoreExpression: ExpressionGroup,
    userExpression: ExporessionGroup
});

var ExpressionGroup = mongoose.Schema({
    read: [Expression],
    write: [Expression],
    add: [Expression],
    remove: [Expression]
});

var Expression = mongoose.Schema({
    path: [String],
    tag: Boolean
});

var ScoreType = mongoose.Schema({
    name: String,
    description: String,
    tradeRules: [TradeRule]
});

var TradeRule = mongoose.Schema({
    from: ObjectId,
    to: ObjectId,
    weight: {
        from : Number,
        to: Number,
        decimalPartRule: {
            type: String,
            enum: ['toZero', 'toOne', 'nearly'] // 分别代表抹零、进一和四舍五入
        }
    }
});

var UserGroup = mongoose.Schema({
    extendBy: ObjectId,
    name: String,
    scoreExpression: ExpressionGroup,
    userExpression: ExporessionGroup
});
