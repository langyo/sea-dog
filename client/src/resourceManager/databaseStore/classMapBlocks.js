import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class ClassMapBlocks extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.classMapBlocks,
      'classMapBlocks',
      [
        
      ],
      [
        
      ]
    );
  }
}

export default new ClassMapBlocks();