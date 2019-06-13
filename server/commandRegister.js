import { send, register, receive, connectionEvents } from "./webSocketServer";
import db from "./databaseDriver";

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

db.then(collections => {
  connectionEvents.on('h5', () => {
    console.log("开始注册 h5 的指令……");
    register("h5", {
      database: {
        get: function (collection, id, key) {
          console.log("已执行")
          if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
          collections[collection].findOne({ _id: id }).exec((err, doc) => {
            if (err) this.send(collection, id, key, "fail", err.toString());
            if (doc && doc[key]) this.send(collection, id, key, "success", doc[key]);
            else console.log(doc), this.send(collection, id, key, "fail", "没有这个值！");
          });
        },

        set: function (collection, id, key, value) {
          if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
          collections[collection].findOne({ _id: id }).exec((err, doc) => {
            if (err) return this.send(collection, id, key, "fail", err.toString());
            if (!doc) return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");
            else if (!doc[key]) this.send(collection, id, key, "fail", "数据库保存失败，理由是没有这个键：" + key);
            else if (Array.isArray(doc[key])) this.send(collection, id, key, "fail", "数据库保存失败，理由是 set 无法处理数组的操作：" + key);

            doc[key] = value;

            doc.save(err => {
              if (err) this.send(collection, id, key, "fail", "数据库保存失败！（也许是没有权限？）：" + err.toString());
              else this.send(collection, id, key, "success");
            });
          });
        },

        'array': {
          push: function (collection, id, key, value) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({ _id: id }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());

              if (!doc)
                return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");
              else if (!doc[key])
                return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");
              else if (!Array.isArray(doc[key]))
                return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");

              if (doc[key].indexOf(value) == -1) doc[key].push(value);
              else this.send(collection, id, key, "fail", "已经有这个元素了！");

              doc.save(err => {
                if (err) this.send(collection, id, key, "fail", "数据库保存失败！（也许是没有权限？）：" + err.toString());
                else this.send(collection, id, key, "success");
              });
            });
          },

          shift: function (collection, id, key, value) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({ _id: id }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());

              if (!doc)
                return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");
              else if (!doc[key])
                return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");
              else if (!Array.isArray(doc[key]))
                return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");

              doc[key] = doc[key].filter(n => n.id != value);

              doc.save(err => {
                if (err) this.send(collection, id, key, "fail", "数据库保存失败！（也许是没有权限？）：" + err.toString());
                else this.send(collection, id, key, "success");
              });
            });
          },

          list: function (collection, id, key, from, to) {
            if (!collections[collection]) this.send(collection, id, key, "fail", "不存在这个集合");
            collections[collection].findOne({ _id: id }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());

              if (!doc)
                return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");
              else if (!doc[key])
                return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");
              else if (!Array.isArray(doc[key]))
                return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");

              if (!from)
                from = 0;

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
            collections[collection].findOne({ _id: id }).exec((err, doc) => {
              if (err) this.send(collection, id, key, "fail", err.toString());

              if (!doc)
                return this.send(collection, id, key, "fail", "数据库保存失败，压根就没查到你要的表！");
              else if (!doc[key])
                return this.send(collection, id, key, "fail", "数据库保存失败，没有这个键：\"" + key + "\"");
              else if (!Array.isArray(doc[key]))
                return this.send(collection, id, key, "fail", "数据库保存失败，\"" + key + "\"不是一个数组！");

              this.send(collection, id, key, "success", doc[key].length);
            });
          },
        },

        list: function (collection, from, to) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");
          if (to) {
            collections[collection].find({}).skip(+from).limit(+to - from + 1).exec((err, doc) => {
              if (err) this.send(collection, "fail", err.toString());

              if (!doc)
                return this.send(collection, "fail", "数据库查询失败，压根就没查到你要的表！");

              let ret = doc.map(n => n.id.toString()).reduce((prev, next) => prev + " " + next);
              this.send(collection, "success", ret);
            });
          } else {
            collections[collection].find({}).skip(+from).exec((err, doc) => {
              if (err) this.send(collection, "fail", err.toString());

              if (!doc)
                return this.send(collection, "fail", "数据库查询失败，压根就没查到你要的表！");

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
          })
        },

        create: function (collection) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");
          let n = new collections[collection](docDefault[collection]);
          n.save((err) => {
            if (err) this.send(collection, "fail", err.toString());
            else this.send("success", n.id);
          });
        },

        remove: function (collection, id) {
          if (!collections[collection]) this.send(collection, "fail", "不存在这个集合");
          collections[collection].remove({ '_id': id }, (err, msg) => {
            if (err) this.send("fail", err.toString());
            else this.send("success");
          });
        }
      }
    });
  });
})