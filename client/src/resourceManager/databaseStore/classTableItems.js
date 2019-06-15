import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class ClassTableItems extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.classTableItems,
      'classTableItems',
      [
        
      ],
      [
        
      ]
    );
  }
}

export default new ClassTableItems();