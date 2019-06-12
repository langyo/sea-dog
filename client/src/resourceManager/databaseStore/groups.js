import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";

class Groups extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      groups: {}
    };
    this.listenToMany(Actions.database.groups);
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
    let n = this.state.groups;

    // 初始化
    for (let i of list) n[i] = {};
    this.setState({ groups: n });

    // 对每一项逐个请求
    for (let i of list) {
      send("execute", "database at groups", i, "run get", "name");
    }
  }

  updateByDatabase(id, key, value) {
    let n = this.state.groups[id];
    n[key] = value;
    this.setState({
      groups: n
    });
    console.log("当前的 groups：", n);
  }

  addMember() {

  }

  removeMember() {

  }

  updateMember() {

  }
}

export default new Groups();