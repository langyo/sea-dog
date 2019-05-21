import Reflux from "reflux";

import db from "../database";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

class Drawer extends Reflux.Store {
	constructor() {
		super();
		this.state = {
			show: "picker",
			drawerOpen: false
		};
		this.listenToMany(Actions.view.drawer);
	}

	toggleTo(name) {
		this.setState({ show: name });
	}

	reset() {
		this.setState({ show: 'main' })
	}

	toggleDrawerOpen = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	};
}

export default new Drawer();