import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Randomizer extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            score: [0, 0, 0],
            list: ["点击开始"],
            generateCount: 3
		};
		this.listenToMany(Actions.page.randomizer);
	}

	scoreAddOne(id) {
        this.setState({ score: this.state.score[id] + 1})
    }

    scoreRemoveOne(id) {
        this.setState({ score: this.state.score[id] - 1})
    }

    handleChangeGenerateCount(n) {
        this.setState({ generateCount: n });
    }

    handlePushGenerateCountNumber(n) {
        this.setState({ generateCount: this.state.generateCount * 10 + n});
    }

    handlePopGenerateCountNumber(n) {
        this.setState({ generateCount: this.state.generateCount / 10 });
    }
}

export default new Randomizer();