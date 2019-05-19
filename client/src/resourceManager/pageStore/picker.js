import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Picker extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            score: 0,
            nowSelecting: "点击开始"
		};
		this.listenToMany(Actions.page.picker);
	}

	scoreAddOne() {
        this.setState({ score: this.state.score + 1})
    }

    scoreRemoveOne() {
        this.setState({ score: this.state.score - 1})
    }
}

export default new Picker();