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

  addGroup(className, type, name) {

  }

  removeGroup(className, type, name) {

  }

  updateGroup(className, type, name, info) {

  }

  updateByDatabase(str) {

  }

  updateByDatabase() {

  }
}

export default new GroupTypes();