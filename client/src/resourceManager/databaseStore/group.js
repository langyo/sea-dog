import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Group extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            members: db.get("classes[" + id + "]").value()
        };
		this.listenToMany(Actions.database.single.class(id));
	}

	updateMember(object){
        let members = db.get("classes[" + id + "]").value();
        members.push(object);
        db.set("classes[" + this.id + "].group", members).write();

        this.setState({
            members: members
        });
    }

    removeMember(object){
        
    }
}

export default Group;