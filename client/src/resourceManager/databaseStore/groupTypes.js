import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";

class GroupTypes extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      groupTypes: {}
    };
    this.listenToMany(Actions.database.groupTypes);
  }

  // 用于获取 ID 列表
  generateList(from, globalCount) {
    const skip = 10;
    let to = from + skip;
    if (from >= globalCount) return;
    else if (to >= globalCount) to = globalCount - 1;
    send("execute", "database list groups run list", from + ".." + to);
    this.generateList(to + 1, globalCount);
  }

  // 用于读取 ID 列表中各个 ID 对应对象的数据
  initializeList(list) {
    let n = this.state.groupTypes;

    // 初始化
    for (let i of list) n[i] = {};
    this.setState({ groupTypes: n });

    // 对每一项逐个请求
    for (let i of list) {
      send("execute", "database at groupTypes", i, "run get", "name");
    }
  }

  updateByDatabase(id, key, value) {
    let n = this.state.groupTypes[id];
    n[key] = value;
    this.setState({
      groupTypes: n
    });
    console.log("当前的 groupTypes：", n);
  }

  addGroup(className, type, name) {

  }

  removeGroup(className, type, name) {

  }

  updateGroup(className, type, name, info) {

  }
}

export default new GroupTypes();