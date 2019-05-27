import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Theme extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            primaryColor: '#006064',
			secondaryColor: '#006064',
			menuTheme: 'ios',   // Android 版为左侧抽屉，ios 版为底部选择器,
			isDesktop: document.body.scrollWidth >= 600
		};
		this.listenToMany(Actions.view.theme);
	}

	togglePrimary = (color) => {
		this.setState({ primaryColor: color });
	};

	toggleSecondary = (color) => {
		this.setState({ secondaryColor: color })
	};

	toggleMenuTheme = (theme) => {
		console.log(theme);
		if(theme != 'ios' && theme != 'android') throw new Error("未知的主题模式 " + theme);
		this.setState({ menuTheme: theme });
	};

	handleResize = (isDes) => {
		console.log("resized, and the 'isDesktop' is", isDes);
        this.setState({isDesktop: isDes});
    };
}

export default new Theme();