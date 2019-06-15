import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class Classes extends DatabaseBaseClass {
    constructor() {
      super(
        Actions.database.classes,
        'classes',
        [
          'name'
        ],
        [
          'members'
        ]
      );
    }

    addGroup() {

    }

    addMember() {

    }

    removeGroup() {

    }

    removeMember() {

    }

    updateGroup() {

    }

    updateMember() {

    }
}

export default new Classes();