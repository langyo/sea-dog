import { send, register, receive, connectionEvents } from "./socketMessageManager/webSocketClient";

import Actions from "./actions";

connectionEvents.on("load", () => {
  receive({
    database: {
      count: function(collection, state, count) {
        if(Actions.database[collection] && state == "success"){
          Actions.database[collection]._count(0, count);
        }
        else if(state != "success") console.error("count 指令执行失败，原因：", arguments[arguments.length - 1]);
        else console.error("接收到了个无效的 count 指令回复，操作的表为", collection);
      },
      list: function(collection, state, ...list) {
        if(Actions.database[collection] && state == "success") {
          list = Array.prototype.slice.call(list);
          Actions.database[collection]._list(list);
        }
        else if(state != "success") console.error("list 指令执行失败，原因：", arguments[arguments.length - 1]);
        else console.error("接收到了个无效的 list 指令回复，操作的表为", collection);
      },
      get: function(collection, id, key, state, value) {
        if(Actions.database[collection] && state == "success") {
          Actions.database[collection]._get(id, key, value);
        }
        else if(state != "success") console.error("get 指令执行失败，原因：", arguments[arguments.length - 1]);
        else console.error("接收到了个无效的 get 指令回复，操作的表为", collection);
      },
      array: {
        count: function(collection, id, key, state, count) {
          if(Actions.database[collection] && state == "success"){
            Actions.database[collection]._arrayCount(id, key, 0, count);
          }
          else if(state != "success") console.error("count 指令执行失败，原因：", arguments[arguments.length - 1]);
          else console.error("接收到了个无效的 array count 指令回复，操作的表为", collection);  
        },
        list: function(collection, id, key, state, ...list) {
          if(Actions.database[collection] && state == "success") {
            list = Array.prototype.slice.call(list);
            Actions.database[collection]._arrayList(id, key, list);
          }
          else if(state != "success") console.error("list 指令执行失败，原因：", arguments[arguments.length - 1]);
          else console.error("接收到了个无效的 array list 指令回复，操作的表为", collection);  
        }
      }
    }
  });

  console.log("触发 ready 事件");
  connectionEvents.emit('ready');

  // 设置数据库状态为已准备好
  Actions.view.system.toggleDatabaseState("ready");
});

export default {
  send: send,
  register: register,
  receive: receive
};