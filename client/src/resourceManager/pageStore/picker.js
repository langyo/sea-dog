import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";

class Picker extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      score: 0,

      nowSelectingLuckyGuy: "点击开始",
      nowSelectingGroup: '',
      nowSelectingGroupType: '',
      nowSelectingClass: '',

      working: false
    };
    this.listenToMany(Actions.page.picker);
  }

  scoreAddOne() {
    this.setState({ score: this.state.score + 1 })
  }

  scoreRemoveOne() {
    this.setState({ score: this.state.score - 1 })
  }

  openRandomPicker() {
    const { accounts, groups, nowSelectingGroup } = this.state;

    if (!groups[nowSelectingGroup]) return;

    this.list = groups[nowSelectingGroup].members.map(n => accounts[n.id].name);

    this.setState({ working: true });
    this.generateRandom();
  }

  generateRandom = () => {
    let n = Math.ceil(Math.random() * this.list.length);
    this.setState({ nowSelectingLuckyGuy: n >= this.list.length ? "运气不佳 :P" : this.list[n] });
    if (this.state.working) requestAnimationFrame(this.generateRandom);
  }

  closeRandomPicker() {
    this.setState({ working: false });
  }
}

export default new Picker();