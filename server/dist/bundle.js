(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _webSocketServer = require("./webSocketServer");

var _databaseDriver = _interopRequireDefault(require("./databaseDriver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const docDefault = {
  "classes": {
    name: "新班级"
  },
  "accounts": {
    name: "新用户"
  },
  "broadcasts": {},
  "classTables": {},
  "globalUserGroups": {},
  "userGroups": {},
  "groupTypes": {},
  "themes": {},
  "questions": {},
  "tests": {},
  "scoreGroups": {},
  "scoreTypes": {}
};

_databaseDriver.default.then(collections => {
  _webSocketServer.connectionEvents.on('h5', () => {
    console.log("开始注册 h5 的指令……");
    (0, _webSocketServer.register)("h5", {
      database: {
        get: function (collection, id, key) {
          console.log("已执行");
          if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
          collections[collection].findOne({
            _id: id
          }).exec((err, doc) => {
            if (err) this.send(collection, id, key, "fail", err.toString());
            if (doc && doc[key]) this.send(collection, id, key, "success", doc[key]);else console.log(doc), this.send(collection, id, key, "fail", "没有这个值！");
          });
        },
        set: function (collection, id, key, value) {
          if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
          collections[collection].findOne({
            _id: id
          }).exec((err, doc) => {
            if (err) return this.send(collection, id, key, "fail", err.toString());
            if (!doc) return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");else if (!doc[key]) this.send(collection, id, key, "fail", "数据库保存失败，理由是没有这个键：" + key);else if (Array.isArray(doc[key])) this.send(collection, id, key, "fail", "数据库保存失败，理由是 set 无法处理数组的操作：" + key);
            doc[key] = value;
            doc.save(err => {
              if (err) this.send(collection, id, key, "fail", "数据库保存失败！（也许是没有权限？）：" + err.toString());else this.send(collection, id, key, "success");
            });
          });
        },
        'array': {
          push: function (collection, id, key, value) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({
              _id: id
            }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());
              if (!doc) return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");else if (!doc[key]) return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");else if (!Array.isArray(doc[key])) return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");
              if (doc[key].indexOf(value) == -1) doc[key].push(value);else this.send(collection, id, key, "fail", "已经有这个元素了！");
              doc.save(err => {
                if (err) this.send(collection, id, key, "fail", "数据库保存失败！（也许是没有权限？）：" + err.toString());else this.send(collection, id, key, "success");
              });
            });
          },
          shift: function (collection, id, key, value) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({
              _id: id
            }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());
              if (!doc) return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");else if (!doc[key]) return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");else if (!Array.isArray(doc[key])) return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");
              doc[key] = doc[key].filter(n => n.id != value);
              doc.save(err => {
                if (err) this.send(collection, id, key, "fail", "数据库保存失败！（也许是没有权限？）：" + err.toString());else this.send(collection, id, key, "success");
              });
            });
          },
          list: function (collection, id, key, from, to) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({
              _id: id
            }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());
              if (!doc) return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");else if (!doc[key]) return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");else if (!Array.isArray(doc[key])) return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");
              if (!from) from = 0;
              let list = doc[key].map(n => n._id.toString());
              console.log("列表解析结果：", list);

              if (to) {
                list = list.slice(+from, +to + 1);
              } else {
                list = list.slice(+from);
              }

              this.send(collection, id, key, "success", list.reduce((prev, next) => prev + " " + next));
            });
          },
          count: function (collection, id, key) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({
              _id: id
            }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());
              if (!doc) return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");else if (!doc[key]) return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");else if (!Array.isArray(doc[key])) return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");
              this.send(collection, id, key, "success", doc[key].length);
            });
          }
        },
        list: function (collection, from, to) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");

          if (to) {
            collections[collection].find({}).skip(+from).limit(+to - from + 1).exec((err, doc) => {
              if (err) this.send(collection, "fail", err.toString());
              if (!doc) return this.send(collection, "fail", "数据库查询失败，压根就没查到你要的表！");
              let ret = doc.map(n => n.id.toString()).reduce((prev, next) => prev + " " + next);
              this.send(collection, "success", ret);
            });
          } else {
            collections[collection].find({}).skip(+from).exec((err, doc) => {
              if (err) this.send(collection, "fail", err.toString());
              if (!doc) return this.send(collection, "fail", "数据库查询失败，压根就没查到你要的表！");
              let ret = doc.map(n => n.id.toString()).reduce((prev, next) => prev + " " + next);
              this.send(collection, "success", ret);
            });
          }
        },
        count: function (collection) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");
          collections[collection].count().exec((err, num) => {
            if (err) this.send(collection, "fail", err.toString());
            this.send(collection, "success", num);
          });
        },
        create: function (collection) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");
          let n = new collections[collection](docDefault[collection]);
          n.save(err => {
            if (err) this.send(collection, "fail", err.toString());else this.send("success", n.id);
          });
        },
        remove: function (collection, id) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");
          collections[collection].remove({
            '_id': id
          }, (err, msg) => {
            if (err) this.send("fail", err.toString());else this.send("success");
          });
        }
      }
    });
  });
});

},{"./databaseDriver":2,"./webSocketServer":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const mongoose = eval('require\("mongoose"\)');
let db = mongoose.createConnection('mongodb://localhost/test');
db.on('error', e => console.error(e));

var _default = new Promise(resolve => {
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
      path: {
        type: ObjectId,
        ref: "Path"
      },
      tag: Boolean
    });
    let ExpressionGroupSchema = mongoose.Schema({
      read: [{
        type: ObjectId,
        ref: "Expression"
      }],
      write: [{
        type: ObjectId,
        ref: "Expression"
      }],
      add: [{
        type: ObjectId,
        ref: "Expression"
      }],
      minus: [{
        type: ObjectId,
        ref: "Expression"
      }]
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
      weightFrom: Number,
      weightTo: Number,
      weightDecimalPartRule: {
        type: String,
        enum: ['toZero', 'toOne', 'nearly'] // 分别代表抹零、进一和四舍五入

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
        ref: "TradeRule"
      }],
      virtual: Boolean // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息

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
        enum: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
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
        ref: "ClassTableItem"
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
    let ProvideSchema = mongoose.Schema({
      to: {
        type: String,
        enum: ['class', 'group', 'member']
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
        enum: ['objective', // 客观题
        'subjective' // 主观题
        ]
      },
      description: String,
      // 允许使用 Markdown
      answer: [{
        type: ObjectId,
        ref: "Answer"
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
        ref: "Provide"
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
        ref: "AccountHistoryQuestionItem"
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
        ref: "AccountHistoryTestItem"
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
        ref: "Date"
      }]
    });
    let AccountHistorySchema = mongoose.Schema({
      practisedQuestions: [{
        type: ObjectId,
        ref: "AccountHistoryQuestion"
      }],
      practisedTest: [{
        type: ObjectId,
        ref: "AccountHistoryTest"
      }],
      picked: [{
        type: ObjectId,
        ref: 'PickedHistory'
      }]
    });
    let ThemeSchema = mongoose.Schema({
      picture: String,
      // BASE64
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
        enum: ['android', 'ios'],
        index: true
      }
    });
    let BroadcastSchema = mongoose.Schema({
      whoCanView: [{
        type: ObjectId,
        ref: 'UserGroup'
      }],
      // 如果为空，则所有人都看得到
      date: {
        type: Date,
        index: true
      },
      message: String,
      // 允许使用 Markdown
      title: String
    });
    let GlobalUserGroupSchema = mongoose.Schema({
      name: {
        type: String,
        index: true
      },
      scoreExpression: {
        type: ObjectId,
        ref: "ExpressionGroup"
      },
      userExpression: {
        type: ObjectId,
        ref: "ExpressionGroup"
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
        ref: "ExpressionGroup"
      },
      userExpression: {
        type: ObjectId,
        ref: "ExpressionGroup"
      }
    });
    let GroupScoreWeightSchema = mongoose.Schema({
      scoreType: {
        type: ObjectId,
        ref: 'ScoreType',
        index: true
      },
      expression: String // 为一个以 JavaScript 写的函数代码文本，具体内容需额外设计 API

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
        ref: "Group"
      }],
      name: String,
      groupScoreTransfer: {
        type: ObjectId,
        ref: "GroupScoreWeight"
      }
    });
    let LogSchema = mongoose.Schema({
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
    let AccountSchema = mongoose.Schema({
      name: {
        type: String,
        index: true
      },
      password: String,
      // MD5/SHA3
      userGroup: [{
        type: ObjectId,
        ref: 'UserGroup',
        index: true
      }],
      scoreExpression: {
        type: ObjectId,
        ref: "ExpressionGroup"
      },
      userExpression: {
        type: ObjectId,
        ref: "ExpressionGroup"
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
        ref: "Config"
      },
      accountHistory: {
        type: ObjectId,
        ref: "AccountHistory"
      }
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
      rows: [{
        type: ObjectId,
        ref: "ClassMapRow"
      }]
    });
    let ClassMapSchema = mongoose.Schema({
      height: Number,
      weight: Number,
      blocks: [{
        type: ObjectId,
        ref: "ClassMapBlock"
      }]
    });
    let ClassSchema = mongoose.Schema({
      groupTypes: [{
        type: ObjectId,
        ref: "GroupType"
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
        ref: "ClassTable"
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
      provides: db.model('Provide', ProvideSchema),
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
      classMapRows: db.model('ClassMapRow', ClassMapRowSchema)
    }), console.log("数据库初始化完毕");
  });
});

exports.default = _default;

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const diff = (from, to) => {
  for (let i of Object.keys(from)) {
    if (to[i] == undefined || typeof from[i] != 'object' && from[i] != to[i]) to[i] = from[i];else if (typeof from[i] != 'function' && typeof from[i] != 'object') {
      throw new Error("只允许提供函数！");
    } else to[i] = diff(from[i], to[i]);
  }

  return to;
};

class ExecuterContext {
  constructor(cmds, conn) {
    _defineProperty(this, "send", (...args) => {
      let arr = this.cmdHead.concat(args);

      this.conn._sendMessage(arr);
    });

    this.cmdHead = ['data'].concat(cmds);
    this.conn = conn;
    this.userId = conn.userId;
  }

}

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
        if (typeof next == 'string') prev.concat(next.trim().split(' '));else if (Array.isArray(next)) prev.concat(next);else if (typeof next == 'number' || typeof next == 'bigint') prev.push("" + next);else if (typeof next == 'boolean') prev.push(next ? 'true' : 'false');else if (typeof next == 'object') prev.push(JSON.stringify(next));else throw new Error("你似乎传入了个既不是具体数据也不是数组的东西……");
        return prev;
      }), ['execute']);
    });

    _defineProperty(this, "_sendMessage", args => {
      console.log("即将发送：", args, "，类型：", typeof args);
      let cmd = args.reduce((prev, next) => prev + ' ' + next);
      let type = /^(execute|data).*$/.exec(cmd)[1];

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

    _defineProperty(this, "_receiveMessagePre", str => {
      if (str[0] == '@') return;
      this.buffer += str + '\n';
      let cmds = this.buffer.split('\n');
      this.buffer = cmds.pop();
      console.log("当前缓冲区：", this.buffer);
      console.log("即将传入指令：", cmds);
      cmds.forEach(n => this._receiveMessage(n));
    });

    _defineProperty(this, "_receiveMessage", cmd => {
      console.log(cmd);
      let args = cmd.trim().split(' ');
      let type = args.shift();
      let func = type == 'execute' ? this.registerObject : this.receiveObject;
      let arg = args.shift();
      let cmds = [arg];

      try {
        for (; typeof func[arg] == 'object'; func = func[arg], arg = args.shift(), cmds.push(arg)) if (func === undefined) throw new Error("不存在这个对象！");

        if (type == 'execute' && func[arg] === undefined) throw new Error("不存在这个对象！");
      } catch (e) {
        this._sendMessage(['data', 'system', 'fail', '未知路径']);
      }

      try {
        // 开始根据解析出的参数列表调用对应的函数
        let ret = func[arg].apply(new ExecuterContext(cmds, this), args); // 如果对方为 execute，则说明是在请求数据，当 ret 非空时自动给对方一个反馈

        if (type == 'execute' && ret != null) this._sendMessage(['data'].concat(cmds).concat(ret.trim().split(' ')));
      } catch (e) {
        console.log(e);

        if (type == 'execute') {
          let n = ['data'].concat(cmds);
          n.push("fail 未注册的指令");

          this._sendMessage(n);
        }
      }
    });

    this.connection = conn;
    this.registerObject = {};
    this.receiveObject = {};
    conn.on('message', this._receiveMessagePre);
    this.userId = null;
    this.buffer = "";
  }

}

exports.default = PluginDashboard;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionEvents = exports.receive = exports.register = exports.send = void 0;

var _pluginDashboard = _interopRequireDefault(require("./pluginDashboard"));

var _events = require("events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let WebSocket = eval('require\("ws"\)');
const server = new WebSocket.Server({
  port: 9201
}, () => console.log("已创建服务器！"));
let clients = {};
let clientConnectionEventEmitter = new _events.EventEmitter();
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
        clientConnectionEventEmitter.emit(name);
        return "ok";
      }
    }
  });
});

let send = (client, ...data) => clients[client].send(data);

exports.send = send;

let register = (client, obj) => clients[client].register(obj);

exports.register = register;

let receive = (client, obj) => clients[client].receive(obj);

exports.receive = receive;
let connectionEvents = clientConnectionEventEmitter;
exports.connectionEvents = connectionEvents;

},{"./pluginDashboard":4,"events":3}]},{},[1]);
