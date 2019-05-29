import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class ClassManagement extends Reflux.Store {
  constructor() {
    super();
    this.state = {

    };
    this.listenToMany(Actions.page.classManagement);
  }

  appendNewMember() {

  }
}

export default new ClassManagement();