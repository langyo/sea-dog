import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class AccountHistoryQuestions extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.accountHistoryQuestions,
      'accountHistoryQuestions',
      [
        
      ],
      [
        
      ]
    );
  }
}

export default new AccountHistoryQuestions();