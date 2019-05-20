import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Accounts extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            accounts: []
		};
		this.listenToMany(Actions.database.accounts);
	}

	
}

export default new Accounts();