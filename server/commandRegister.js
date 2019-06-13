import { send, register, receive, connectionEvents } from "./webSocketServer";
import db from "./databaseDriver";

db.then(collections => {
  connectionEvents.on('h5', () => {
    console.log("开始注册 h5 的指令……");
    register("h5", {
      database: {
        get: function(collection, id, key) {
          if(!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
          collections[collection].findOne({ _id: id }).exec((err, doc) => {
            if (err) this.send(collection, id, key, "fail", err.toString());
            if (doc && doc[key]) this.send(collection, id, key, "success", doc[key]);
            else console.log(doc), this.send(collection, id, key, "fail", "没有这个值！");
          });
        },

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
              func: (db, id) => Account.findOne({ _id: id })
            },
            "broadcasts": {
              argsCount: 1,
              func: (db, id) => BroadCast.findOne({ _id: id })
            },
            "classTables": {
              argsCount: 1,
              func: (db, id) => ClassTable.findOne({ _id: id })
            },
            "globalUserGroups": {
              argsCount: 1,
              func: (db, id) => GlobalUserGroup.findOne({ _id: id })
            },
            "userGroup": {
              argsCount: 1,
              func: (db, id) => UserGroup.findOne({ _id: id })
            },
            "groupType": {
              argsCount: 1,
              func: (db, id) => GroupType.findOne({ _id: id })
            },
            "theme": {
              argsCount: 1,
              func: (db, id) => Theme.findOne({ _id: id })
            },
            "question": {
              argsCount: 1,
              func: (db, id) => Question.findOne({ _id: id })
            },
            "test": {
              argsCount: 1,
              func: (db, id) => Test.findOne({ _id: id })
            },
            "scoreGroup": {
              argsCount: 1,
              func: (db, id) => ScoreGroup.findOne({ _id: id })
            },
            "scoreType": {
              argsCount: 1,
              func: (db, id) => ScoreType.findOne({ _id: id })
            }
          }

          const evaluators = {
            "get": {
              argsCount: 1,
              func: (db, objName) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", err.toString());
                  if (doc && doc[objName]) resolve(objName + " " + doc[objName]);
                  else console.log(doc), reject("没有这个值！");
                });
              }
            },
            "set": {
              argsCount: 2,
              func: (db, objName, value) => (resolve, reject) => {
                db.exec((err, doc) => {
                  if (err) this.send("fail", err.toString());

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
                  if (err) this.send("fail", err.toString());

                  if (!doc)
                    return reject("数据库保存失败，压根就没查到你要的表！");
                  else if (!doc[objName])
                    return reject("数据库保存失败，理由是没有这个键：" + objName);
                  else if (!Array.isArray(doc[objName]))
                    return reject("数据库保存失败，理由是 add 无法处理非数组的操作：" + objName);

                  if (doc[objName].indexOf(value) == -1) doc[objName].push(value);
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
                  if (err) this.send("fail", err.toString());

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
                  if (err) this.send("fail", err.toString());

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
                  console.log('doc[objName]:', doc[objName]);
                  let list = selection == "id"
                    ? doc[objName].map(n => n._id)
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
                  if (err) this.send("fail", err.toString());

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
                err => this.send("fail", err.toString())
              );
            }
            else this.send("fail", "不存在这个执行方法！", args[0]);
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
            else this.send("fail", "不存在这个选择器！", args[0]);
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
                  db.skip(+match[1]).limit(+match[2] - match[1] + 1).exec((err, doc) => {
                    if (err) this.send("fail", err.toString());

                    if (!doc)
                      return reject("数据库查询失败，压根就没查到你要的表！");

                    let ret = doc.map(n => n.id.toString()).reduce((prev, next) => prev + " " + next);
                    resolve(ret);
                  });
                } else {
                  db.skip(+match[1]).exec((err, doc) => {
                    if (err) this.send("fail", err.toString());

                    if (!doc)
                      return reject("数据库查询失败，压根就没查到你要的表！");

                    let ret = doc.map(n => n.id.toString()).reduce((prev, next) => prev + " " + next);
                    resolve(ret);
                  });
                }
              }
            },
            "count": {
              argsCount: 0,
              func: (db) => (resolve, reject) => {
                db.count((err, num) => {
                  if (err) this.send("fail", err.toString());

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
                err => this.send("fail", err.toString())
              );
            }
            else this.send("fail", "不存在这个执行方法！", args[0]);
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
            else this.send("fail", "不存在这个选择器！", args[0]);
          }
          dfs_selector(db, args);
        },
        doc: function (name, _run, cmd, id) {
          const docs = {
            "classes": Class,
            "accounts": Account,
            "broadcasts": BroadCast,
            "classTables": ClassTable,
            "globalUserGroups": GlobalUserGroup,
            "userGroups": UserGroup,
            "groupTypes": GroupType,
            "themes": Theme,
            "questions": Question,
            "tests": Test,
            "scoreGroups": ScoreGroup,
            "scoreTypes": ScoreType
          };

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

          if (!docs[name] || !docDefault[name]) {
            this.send("fail", "不存在这个表！");
            return;
          }

          switch (cmd) {
            case "create":
              let n = new docs[name](docDefault[name]);
              n.save((err) => {
                if (err) this.send("fail", "存储失败, " + err);
                else this.send("success", n.id);
              });
              return;
            case "remove":
              docs[name].remove({ '_id': id }, (err, msg) => {
                if (err) this.send("fail", err.toString());
                else this.send("success", msg.toString());
              });
              return;
            default:
              this.send("fail", "无法识别的指令：" + cmd);
          }
        }
      }
    });
  });
})