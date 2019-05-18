(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _databaseInitializer = _interopRequireDefault(require("./databaseInitializer"));

var _webSocketServer = require("./webSocketServer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./databaseInitializer":2,"./webSocketServer":4}],2:[function(require,module,exports){
"use strict";

let mongoose = eval('require\("mongoose"\)');
const ObjectId = mongoose.Schema.Types.ObjectId;
let db = mongoose.createConnection('mongodb://localhost/test');
db.on('error', e => console.error(e));
db.on('open', () => console.log("连接成功")); // 主键列表：
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
      enum: ['toZero', 'toOne', 'nearly'] // 分别代表抹零、进一和四舍五入

    }
  }
});
var ScoreTypeSchema = mongoose.Schema({
  name: String,
  description: String,
  tradeRules: [TradeRuleSchema],
  virtual: Boolean // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息

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
    enum: ['createQuestion', 'forkQuestion', 'deleteQuestion', 'createTest', 'watchTestResult', 'forkTest', 'deleteTest', 'setTheme']
  }],
  disallow: [{
    type: String,
    enum: ['createQuestion', 'forkQuestion', 'deleteQuestion', 'createTest', 'watchTestResult', 'forkTest', 'deleteTest', 'setTheme']
  }]
});
var ClassStateSchema = mongoose.Schema({
  isHavingClass: {
    type: String,
    enum: ['begin', // 正常上课
    'over', // 下课
    'continue' // 拖堂
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
    enum: ['objective', // 客观题
    'subjective' // 主观题
    ]
  },
  description: String,
  // 允许使用 Markdown
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
  picture: String,
  // BASE64
  isVR: {
    type: Boolean,
    default: false
  },
  primaryColor: String,
  secondaryColor: String,
  opacity: Number,
  mobileTheme: {
    type: String,
    enum: ['android', 'ios']
  }
});
var BroadcastSchema = mongoose.Schema({
  whoCanView: [{
    type: ObjectId,
    ref: 'UserGroup'
  }],
  // 如果为空，则所有人都看得到
  date: Date,
  message: String // 允许使用 Markdown

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
  expression: String // 为一个以 JavaScript 写的函数代码文本，具体内容需额外设计 API

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
    enum: ['scoreAdd', 'scoreRemove', 'scoreSet', 'memberAdd', 'memberRemove', 'memberSet']
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
  password: String,
  // MD5/SHA3
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const diff = (from, to) => {
  for (let i of Object.keys(from)) {
    if (to[i] == undefined || typeof from[i] != 'object' && from[i] != to[i]) to[i] = from[i];else if (typeof from[i] != 'function' && typeof from[i] != 'object') {
      console.log(from);
      throw new Error("只允许提供函数！");
    } else to[i] = diff(from[i], to[i]);
  }

  return to;
};

const toArray = _args => {
  let ret = [];

  for (let i = 0; i < _args.length; ++i) ret.push(_args[i]);

  return ret;
};

class PluginDashboard {
  constructor(conn) {
    _defineProperty(this, "register", obj => {
      this.registerObject = diff(obj, this.registerObject);
    });

    _defineProperty(this, "receive", obj => {
      this.receiveObject = diff(obj, this.receiveObject);
    });

    _defineProperty(this, "send", (...args) => {
      this._sendMessage(args.reduce((prev, next) => {
        if (typeof next == 'string') prev.concat(next.trim().split(' '));else if (Array.isArray(next)) prev.concat(next);else if (typeof next == 'number' || typeof next == 'bigint') prev.push("" + next);else if (typeof next == 'boolean') prev.push(next ? 'true' : 'false');else throw new Error("你似乎传入了个既不是具体数据也不是数组的东西……");
        return prev;
      }), ['execute']);
    });

    _defineProperty(this, "_sendMessage", args => {
      let cmd = args.reduce((prev, next) => prev + ' ' + next);
      console.log(args);
      let type = args.shift();

      switch (type) {
        case 'execute':
        case 'data':
          this.connection.send(cmd);
          break;

        default:
          console.log("似乎是个错误的指令：", cmd);
          throw new Error("不合法的命令类型！");
      }
    });

    _defineProperty(this, "_receiveMessage", cmd => {
      let args = cmd.trim().split(' ');
      let type = args.shift();
      let func = type == 'execute' ? this.registerObject : this.receiveObject;
      let arg = args.shift();
      let cmds = [arg];

      for (; typeof func[arg] == 'object'; func = func[arg], arg = args.shift(), cmds.push(arg)) if (func === undefined) throw new Error("不存在这个对象！");

      if (type == 'execute' && func[arg] === undefined) throw new Error("不存在这个对象！"); // 开始根据解析出的参数列表调用对应的函数

      let ret = func[arg].apply(null, args); // 如果对方为 execute，则说明是在请求数据，当 ret 非空时自动给对方一个反馈

      if (type == 'execute' && ret != null) this._sendMessage(['data'].concat(cmds).concat(ret.trim().split(' ')));
    });

    this.connection = conn;
    this.registerObject = {};
    this.receiveObject = {};
    conn.on('message', this._receiveMessage);
    this.userId = null;
  }

}

exports.default = PluginDashboard;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receive = exports.register = exports.send = void 0;

var _pluginDashboard = _interopRequireDefault(require("./pluginDashboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let WebSocket = eval('require\("ws"\)');
const server = new WebSocket.Server({
  port: 9201
}, () => console.log("已创建服务器！"));
let clients = {};
server.on('connection', conn => {
  console.log("获取到了新的连接！");
  let client = new _pluginDashboard.default(conn);
  client.register({
    'system': {
      'register': name => {
        console.log("已注册新的连接 ", name);
        clients[name] = client;
        client.register({
          'system': {
            'register': () => null
          }
        });
        return "ok";
      }
    }
  });
});

let send = (client, ...data) => clients[client](data);

exports.send = send;

let register = (client, obj) => clients[client](obj);

exports.register = register;

let receive = (client, obj) => clients[client](obj);

exports.receive = receive;

},{"./pluginDashboard":3}]},{},[1]);
