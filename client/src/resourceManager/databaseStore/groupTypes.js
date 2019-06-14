import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class GroupTypes extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.groupTypes,
      'groupTypes',
      [
        'name'
      ]
    );
  }

  addGroup(className, type, name) {

  }

  removeGroup(className, type, name) {

  }

  updateGroup(className, type, name, info) {

  }
}

export default new GroupTypes();