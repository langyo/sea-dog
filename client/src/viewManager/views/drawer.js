import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Badge from "@material-ui/core/Badge";

import ClassroomIcon from "mdi-material-ui/GoogleClassroom";
import InfoIcon from "mdi-material-ui/InformationOutline";
import AccountIcon from "mdi-material-ui/AccountCircleOutline";

import Actions from "../../resourceManager/actions";

const styles = theme => ({
	list: {
		width: 250,
		opacity: 0.8
	},
	toolbar: theme.mixins.toolbar
});

class MainDrawer extends Reflux.Component {
	state = {
		drawerOpen: false,
		tag: "mainPage"
	}

	toggleDrawer = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Drawer
				open={this.props.open}
				onClose={this.props.onToggle}
				className={classes.list}
				variant={this.props.isDesktop ? "permanent" : "temporary"}
			>
				{this.props.isDesktop && <div className={classes.toolbar} />}
				<List>
					<ListItem button>
						<ListItemIcon>
							<Badge color="error" variant="dot">
								<ClassroomIcon />
							</Badge>
						</ListItemIcon>
						<ListItemText inset primary="当前设备未关联班级" secondary="当前班级" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Badge color="error" variant="dot">
								<AccountIcon />
							</Badge>
						</ListItemIcon>
						<ListItemText inset primary="未登录" secondary="当前教师" />
					</ListItem>
					<Divider />
					<ListItem button onClick={() => Actions.view.global.dialog.toggleTo('about')}>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="关于" />
					</ListItem>
				</List>
				<Divider />
			</Drawer>
		);
	}
}

MainDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool,
	onToggle: PropTypes.func,
	isDesktop: PropTypes.bool
};

export default withStyles(styles)(MainDrawer);
