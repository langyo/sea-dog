import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Manager extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            classes: db.get("classes[" + id + "]").value()
        };
		this.listenToMany(Actions.database.single.class(id));
	}

	addGroup(object){
        db.set("classes[" + this.id + "].group", object).write();

        this.setState({
            posts: object
        });
    }
}

export default Manager;