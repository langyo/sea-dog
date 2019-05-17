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
import AccountIcon from "mdi-material-ui/AccountCircleOutline";
import PickStudentIcon from "mdi-material-ui/CursorDefaultClickOutline";
import TableIcon from "mdi-material-ui/TableLarge";
import RankIcon from "mdi-material-ui/TrophyVariantOutline";
import PaperIcon from "mdi-material-ui/NoteOutline";
import ManagementIcon from "mdi-material-ui/AccountGroup";
import SettingIcon from "mdi-material-ui/SettingsOutline";
import InfoIcon from "mdi-material-ui/InformationOutline";
import ThemeIcon from "mdi-material-ui/Palette";

import Actions from "../../resourceManager/actions";

const styles = theme => ({
	list: {
		width: 250,
		opacity: 0.8
	},
	toolbar: theme.mixins.toolbar,
	line: {
		marginTop: 4,
		marginBottom: 4
	}
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
					<Divider className={classes.line}/>
					<ListItem button selected>
						<ListItemIcon>
							<PickStudentIcon />
						</ListItemIcon>
						<ListItemText inset primary="点名" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<TableIcon />
						</ListItemIcon>
						<ListItemText inset primary="座位表" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<RankIcon />
						</ListItemIcon>
						<ListItemText inset primary="排行榜" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<PaperIcon />
						</ListItemIcon>
						<ListItemText inset primary="课堂小练" />
					</ListItem>
					<Divider className={classes.line}/>
					<ListItem button>
						<ListItemIcon>
							<ManagementIcon />
						</ListItemIcon>
						<ListItemText inset primary="班级管理" />
					</ListItem>
					<ListItem button onClick={() => Actions.view.dialog.toggleTo('setting')}>
						<ListItemIcon>
							<SettingIcon />
						</ListItemIcon>
						<ListItemText inset primary="设置" />
					</ListItem>
					<ListItem button onClick={() => Actions.view.dialog.toggleTo('about')}>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="关于" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<ThemeIcon />
						</ListItemIcon>
						<ListItemText inset primary="皮肤主题" />
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
