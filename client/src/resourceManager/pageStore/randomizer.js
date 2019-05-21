import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Randomizer extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            score: [0],
            list: ["点击开始"],
            generateCount: 6
		};
		this.listenToMany(Actions.page.randomizer);
	}

	scoreAddOne(id) {
        this.setState({ score: this.state.score[id] + 1})
    }

    scoreRemoveOne(id) {
        this.setState({ score: this.state.score[id] - 1})
    }
}

export default new Randomizer();