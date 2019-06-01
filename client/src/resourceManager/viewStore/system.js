import Reflux from "reflux";

import db from "../database";
import ws from "../websocket";

import Actions from "../actions";

class System extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            
        };
        this.listenToMany(Actions.view.system);
	}

    
}

export default new System();