(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _databaseInitializer = _interopRequireDefault(require("./databaseInitializer"));

var _webSocketServer = require("./webSocketServer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let db = _databaseInitializer.default.createConnection('mongodb://localhost/test');

db.on('error', e => console.error(e));
db.on('open', () => console.log("数据库连接成功"));
const ObjectId = _databaseInitializer.default.Schema.Types.ObjectId;

let PathSchema = _databaseInitializer.default.Schema({
  theClass: String,
  groupType: String,
  group: String,
  member: String
});

let ScoreSchema = _databaseInitializer.default.Schema({
  at: ObjectId,
  value: Number
});

let ExpressionSchema = _databaseInitializer.default.Schema({
  path: PathSchema,
  tag: Boolean
});

let ExpressionGroupSchema = _databaseInitializer.default.Schema({
  read: [ExpressionSchema],
  write: [ExpressionSchema],
  add: [ExpressionSchema],
  minus: [ExpressionSchema]
});

let TradeRuleSchema = _databaseInitializer.default.Schema({
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

let ScoreTypeSchema = _databaseInitializer.default.Schema({
  name: String,
  description: String,
  tradeRules: [TradeRuleSchema],
  virtual: Boolean // 默认为假；如果为真，这个分数的加减会带动其它与之相关联的分数的加减，也就是具有绑定性，加减规则直接使用 tradeRules 记录的信息

});

let ScoreGroupSchema = _databaseInitializer.default.Schema({
  name: String,
  description: String,
  usingScoreTypes: [{
    type: ObjectId,
    ref: 'ScoreType'
  }]
});

let ClassTableItemSchema = _databaseInitializer.default.Schema({
  form: Date,
  to: Date,
  subject: String
});

let ClassTableSchema = _databaseInitializer.default.Schema({
  description: String,
  name: String,
  timeLine: [ClassTableItemSchema],
  userType: {
    type: String,
    enum: ['student', 'teacher']
  }
});

let ConfigSchema = _databaseInitializer.default.Schema({
  allow: [{
    type: String,
    enum: ['createQuestion', 'forkQuestion', 'de leteQuestion', 'createTest', 'watchTestResult', 'forkTest', 'de leteTest', 'setTheme']
  }],
  disallow: [{
    type: String,
    enum: ['createQuestion', 'forkQuestion', 'de leteQuestion', 'createTest', 'watchTestResult', 'forkTest', 'de leteTest', 'setTheme']
  }]
});

let ClassStateSchema = _databaseInitializer.default.Schema({
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

let QuestionSchema = _databaseInitializer.default.Schema({
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

let TestSchema = _databaseInitializer.default.Schema({
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

let AccountHistorySchema = _databaseInitializer.default.Schema({
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

let ThemeSchema = _databaseInitializer.default.Schema({
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

let BroadcastSchema = _databaseInitializer.default.Schema({
  whoCanView: [{
    type: ObjectId,
    ref: 'UserGroup'
  }],
  // 如果为空，则所有人都看得到
  date: Date,
  message: String // 允许使用 Markdown

});

let GlobalUserGroupSchema = _databaseInitializer.default.Schema({
  name: String,
  scoreExpression: ExpressionGroupSchema,
  userExpression: ExpressionGroupSchema
});

let UserGroupSchema = _databaseInitializer.default.Schema({
  extendBy: {
    type: ObjectId,
    ref: 'GlobalUserGroup'
  },
  name: String,
  scoreExpression: ExpressionGroupSchema,
  userExpression: ExpressionGroupSchema
});

let GroupScoreWeightSchema = _databaseInitializer.default.Schema({
  scoreType: {
    type: ObjectId,
    ref: 'ScoreType'
  },
  expression: String // 为一个以 JavaScript 写的函数代码文本，具体内容需额外设计 API

});

let GroupSchema = _databaseInitializer.default.Schema({
  scores: [ScoreSchema],
  members: [{
    account: {
      type: ObjectId,
      ref: 'Account'
    }
  }]
});

let GroupTypeSchema = _databaseInitializer.default.Schema({
  userType: {
    type: ObjectId,
    ref: 'UserGroup'
  },
  group: [GroupSchema],
  name: String,
  groupScoreTransfer: GroupScoreWeightSchema
});

let LogSchema = _databaseInitializer.default.Schema({
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

let AccountSchema = _databaseInitializer.default.Schema({
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

let ClassSchema = _databaseInitializer.default.Schema({
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

_databaseInitializer.default.model('Class', ClassSchema);

_databaseInitializer.default.model('GroupType', GroupTypeSchema);

_databaseInitializer.default.model('GroupScoreWeight', GroupScoreWeightSchema);

_databaseInitializer.default.model('Group', GroupSchema);

_databaseInitializer.default.model('Log', LogSchema);

_databaseInitializer.default.model('Path', PathSchema);

_databaseInitializer.default.model('Score', ScoreSchema);

_databaseInitializer.default.model('Account', AccountSchema);

_databaseInitializer.default.model('ExpressionGroup', ExpressionGroupSchema);

_databaseInitializer.default.model('Expression', ExpressionSchema);

_databaseInitializer.default.model('ScoreType', ScoreTypeSchema);

_databaseInitializer.default.model('TradeRule', TradeRuleSchema);

_databaseInitializer.default.model('UserGroup', UserGroupSchema);

_databaseInitializer.default.model('GlobalUserGroup', GlobalUserGroupSchema);

_databaseInitializer.default.model('ScoreGroup', ScoreGroupSchema);

_databaseInitializer.default.model('ClassTable', ClassTableSchema);

_databaseInitializer.default.model('ClassTableItem', ClassTableItemSchema);

_databaseInitializer.default.model('Config', ConfigSchema);

_databaseInitializer.default.model('ClassState', ClassStateSchema);

_databaseInitializer.default.model('Question', QuestionSchema);

_databaseInitializer.default.model('Test', TestSchema);

_databaseInitializer.default.model('AccountHistory', AccountHistorySchema);

_databaseInitializer.default.model('Theme', ThemeSchema);

_databaseInitializer.default.model('Broadcast', BroadcastSchema);

console.log("数据库创建完成");

_webSocketServer.connectionEvents.on('h5', conn => {
  console.log("开始注册 h5 的指令……");
  (0, _webSocketServer.register)("h5", {
    list: {
      school: {
        classes: () => "123123",
        scoreTypes: (a, b) => a + b
      }
    }
  });
});

},{"./databaseInitializer":2,"./webSocketServer":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = eval('require\("mongoose"\)'); // 主键列表：
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
      console.log(cmd);
      if (cmd[0] == '@') return;
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
