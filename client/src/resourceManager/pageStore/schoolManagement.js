import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class SchoolManagement extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            
		};
		this.listenToMany(Actions.page.schoolManagement);
	}

	
}

export default new SchoolManagement();