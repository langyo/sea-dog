import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Classes extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            classes: []
		};
		this.listenToMany(Actions.database.classes);
	}

	updateMembersByDatabase(members) {
        let className = members[0];
        members = members.slice(1);
        let diff = this.state.classes;
        if(diff[className] == undefined) diff[className] = {};
        diff[className].members = members.reduce(
            (prev, next) => prev.indexOf(next) != -1 ? prev: prev.push(next)
        );
        this.setState({ classes: diff });
    }
}

export default new Classes();