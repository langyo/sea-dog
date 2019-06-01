import { send, register, receive, connectionEvents } from "./socketMessageManager/webSocketClient";

import Actions from "./actions";

connectionEvents.on("load", () => {
  receive({
    database: {
      list: function (name, _run, cmd, state, ...list) {
        if (state == "success") {
          switch (cmd) {
            case "count":
              if (!Actions.databse[name])
                return console.error("data 指令出现了问题，没有名为", name, "的数据存储 Store！");
              if(typeof list[0] != "number") return console.error("data 指令出现了问题，list count 参数", list[0], "不是数字！");
              Actions.database[name].updateDatabase(list[0]);
              break;
            case "list":
              if(!Actions.database[nae])
                return console.error("data 指令出现了问题，没有名为", name, "的数据存储 Store！");
              Actions.database[name].pushListFromDatabase(Array.prototype.slice.call(list));
              break;
            default:
              console.error("data 指令出现了问题，无法识别", cmd, "指令！");
          }
        }else console.error("data 指令出现了问题，指令状态报头为", state);
      }
    }
  });

  send("execute", "database list classes run count");
});

export default {
  send: send,
  register: register,
  receive: receive
};