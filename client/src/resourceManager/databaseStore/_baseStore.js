import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";

export default class BaseStore extends Reflux.Store {
  constructor(listener, collection, props, propsArray) {
    super();
    this.state = {};
    this.state[collection] = {};

    this.listenToMany(listener);

    this.collection = collection;
    this.props = props;
    this.propsArray = propsArray;

    console.log("数据库", collection, "正在初始化");
    send("execute", "database count", collection);
  }

  // 用于获取 ID 列表
  _count(from, globalCount) {
    const skip = 10;
    console.log("接收到", this.collection, "的回调指令，提示一共有", globalCount, "个表项，现在正在获取第", Math.ceil(from / skip) + 1, "批");
    let to = from + skip;
    if (from >= globalCount || globalCount == 0) return;
    else if (to >= globalCount) to = globalCount - 1;
    send("execute", "database list", this.collection, from, to);
    this._count(to + 1, globalCount);
  }

  // 用于读取 ID 列表中各个 ID 对应对象的数据
  _list(list) {
    console.log("接收到", this.collection, "的回调指令，获取到了 ID 列表", list);
    let n = this.state[this.collection];

    // 初始化
    for (let i of list) n[i] = {};
    let doc = {};
    doc[this.collection] = n;
    this.setState(doc);

    // 对每一项逐个请求
    for (let i of list)
    for (let j of this.props)
      send("execute", "database get", this.collection, i, j);
  }

  // 用于存储来自数据库的数据
  _get(id, key, value) {
    console.log("接收到", this.collection, "的回调指令，", id, '[', key, '] = ', value);
    let n = this.state[this.collection];
    if(!n[id]) n[id] = {};
    n[id][key] = value;
    let doc = {};
    doc[this.collection] = n;
    this.setState(doc);
    console.log("当前的 ", this.collection, "：", doc);
  }

  _arrayCount(id, key, state, count) {

  }

  _arrayList(id, key, state, ...list) {

  }
}
