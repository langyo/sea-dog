import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";
import DatabaseBaseClass from "./_baseStore";

class Accounts extends DatabaseBaseClass {
  constructor() {
    super(
      Actions.database.accounts,
      'accounts',
      [
        'name'
      ]
    );
  }

  login() {

  }

  logout() {

  }

  register() {

  }
}

export default new Accounts();