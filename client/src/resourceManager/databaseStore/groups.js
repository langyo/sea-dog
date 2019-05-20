import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Groups extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            	groupTypes: {
				/* groups: {} */
			}
		};
		this.listenToMany(Actions.database.groups);
	}

	addMember() {

	}

	removeMember() {

	}

	updateMember() {

	}

	updateGroupTypeByDatabase() {

	}

	updateGroupByDatabase() {
		
	}
}

export default new Groups();