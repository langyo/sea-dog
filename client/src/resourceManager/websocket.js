import { send, register, receive, connectionEvents } from "./socketMessageManager/webSocketClient";

import Actions from "./actions";

connectionEvents.on("load", () => {
  receive({
    database: {
      list: function (name, _run, cmd, state, ...list) {
        if (state == "success") {
          switch (cmd) {
            case "count":
              if (!Actions.database[name])
                return console.error("data 指令出现了问题，没有名为", name, "的数据存储 Store！");
              if(typeof list[0] != "number") return console.error("data 指令出现了问题，list count 参数", list[0], "不是数字！");
              
              // 开始批量获取 ID
              Actions.database[name].generateList(0, list[0]);

              break;
            case "list":
              if(!Actions.database[name])
                return console.error("data 指令出现了问题，没有名为", name, "的数据存储 Store！");

              Actions.database[name].initializeList(Array.prototype.slice.call(list));
              break;
            default:
              console.error("data 指令出现了问题，无法识别", cmd, "指令！");
          }
        }else console.error("data 指令出现了问题，指令状态报头为", state);
      },
      at: function (name, id, _run, cmd, state, key, value) {
        if(state == "success") {
          switch(cmd) {
            case "get":
              Actions.database[name].updateByDatabase(id, key, value);
              break;
            case "set":
            case "add":
            case "remove":
            case "list":
            case "count":
            default:
                console.error("data 指令出现了问题，无法识别", cmd, "指令！");
          }
        }
      }
    }
  });

  send("execute", "database list classes run count");

  // 设置数据库状态为已准备好
  Actions.view.system.toggleDatabaseState("ready");
});

export default {
  send: send,
  register: register,
  receive: receive
};