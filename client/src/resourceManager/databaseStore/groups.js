import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class Groups extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.groups,
      'groups',
      [
        'name'
      ]
    );
  }

  addMember() {

  }

  removeMember() {

  }

  updateMember() {

  }
}

export default new Groups();