import Reflux from "reflux";

import db from "../database";
import ws from "../websocket";

import Actions from "../actions";

class System extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            // 数据库状态有 ready/loading/error
            databaseState: "loading",
            // 网络状态有 success/connecting/error
            networkState: "connecting"
        };
        this.listenToMany(Actions.view.system);
	}

    toggleDatabaseState(state) {
        // 验证值
        if(['ready', 'loading', 'error'].indexOf(state) == -1) throw new Error("传递的数据库状态不对！");

        console.log("数据库状态已设为", state);
        this.setState({ databaseState: state });
    }

    toggleNetworkState(state) {
        // 验证值
        if(['success', 'connecting', 'error'].indexOf(state) == -1) throw new Error("传递的网络状态不对！");

        console.log("网络状态已设为", state);
        this.setState({ networkState: state });
    }

    log(...message) {
        console.log.prototype.call(message);
    }

    error(...message) {
        console.error.prototype.call(message);
    }
}

export default new System();