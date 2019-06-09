import Reflux from "reflux";

import db from "../database";
import { send, register, receive, connectionEvents } from "../socketMessageManager/webSocketClient";
import Actions from "../actions";

class Accounts extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      accounts: {}
    };
    this.listenToMany(Actions.database.accounts);
  }

  updateByDatabase() {

  }

  login() {

  }

  logout() {

  }

  register() {

  }
}

export default new Accounts();