import Reflux from "reflux";

import db from "../database";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

class Drawer extends Reflux.Store {
	constructor() {
		super();
		this.state = {
			show: '',
			drawerOpen: false
		};
		this.listenToMany(Actions.view.drawer);
	}

	toggleTo(name) {
		console.log("view toggle to", name);
		this.setState({ show: name, drawerOpen: false });
	}

	reset() {
		console.log("reset view");
		this.setState({ show: '', drawerOpen: false })
	}

	toggleDrawerOpen = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	};
}

export default new Drawer();