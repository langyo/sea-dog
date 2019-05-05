import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class MainPage extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            mainPage: db.get("mainPage").value()
        };
		this.listenToMany(Actions.database.global.mainPage);
	}
	
	update(name, id, forums){
        let t = this.state.mainPage.forumGroups;
        t.push(
            {
                forumGroupName: name,
                forumGroupId: id,
                forums: forums
            }
        );

        db.set("mainPage.forumGroups", t).write();

        this.setState({
            mainPage: {
                forumGroups: t
            }
        });
    }
}

export default new MainPage();