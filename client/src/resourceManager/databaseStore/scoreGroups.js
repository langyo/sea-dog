import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class ScoreGroups extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.scoreGroups,
      'scoreGroups',
      [
        
      ],
      [
        
      ]
    );
  }
}

export default new ScoreGroups();