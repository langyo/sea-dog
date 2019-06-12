import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";

class Accounts extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      accounts: {}
    };
    this.listenToMany(Actions.database.accounts);
  }

  // 用于获取 ID 列表
  generateList(from, globalCount) {
    const skip = 10;
    let to = from + skip;
    if (from >= globalCount) return;
    else if (to >= globalCount) to = globalCount - 1;
    send("execute", "database list accounts run list", from + ".." + to);
    this.generateList(to + 1, globalCount);
  }

  // 用于读取 ID 列表中各个 ID 对应对象的数据
  initializeList(list) {
    let n = this.state.accounts;

    // 初始化
    for (let i of list) n[i] = {};
    this.setState({ accounts: n });

    // 对每一项逐个请求
    for (let i of list) {
      send("execute", "database at accounts", i, "run get", "name");
    }
  }

  updateByDatabase(id, key, value) {
    let n = this.state.accounts[id];
    n[key] = value;
    this.setState({
      accounts: n
    });
    console.log("当前的 accounts：", n);
  }

  login() {

  }

  logout() {

  }

  register() {

  }
}

export default new Accounts();