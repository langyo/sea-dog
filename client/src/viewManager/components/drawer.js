import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse';

import Actions from "../../resourceManager/actions";

class MainDrawer extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = Stores.database.classes
	}
	state = {
		open: false,
		listOpen: true
	}

	handleDrawerOpen = () => this.setState({ open: true });
	handleDrawerClose = () => this.setState({ open: false });
	
	handleListToggle = () => this.setState({ listOpen: !this.state.listOpen });


	render() {
		return (
			<Drawer
				open={this.state.open}
				onClose={this.handleDrawerClose}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<List>
					<ListItem button onClick={() => Actions.view.global.dialog.toggleTo('about')}>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="关于" />
					</ListItem>
					<Divider />
					{/* 小组名单 */}
					<ListItem button onClick={this.handleListToggle}>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText inset primary="选择小组" />
						{this.state.listOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListItem>
					<Collapse in={this.state.listOpen} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{/* this.state.groups.map((n, index) => (
								<ListItem
									key={index}
									button
									className={classes.nested}
									selected={this.state.choosingGroup == index}
									onClick={this.handleGroupSelected(index)}
								>
									<ListItemIcon>
										<HumanIcon />
									</ListItemIcon>
									<ListItemText inset primary={n.name} />
									<Menu
										anchorEl={this.state.anchorEl}
										open={this.state.menuSelect == index}
										onClose={this.handleListMenuToggle(index)}
									>
										<MenuItem onClick={this.handleGroupChangeWindow(index)}>修改</MenuItem>
										<MenuItem disabled={this.state.groups.length <= 1} onClick={this.handleGroupDelete(index)}>删除</MenuItem>
									</Menu>
									<IconButton onClick={this.handleListMenuToggle(index)}>
										<MoreIcon />
									</IconButton>
								</ListItem>
							))*/}
							<ListItem button className={classes.nested} onClick={() => Actions.view.global.dialog.toggleTo('newGroup')}>
								<ListItemIcon>
									<AddIcon />
								</ListItemIcon>
								<ListItemText inset primary={"添加新的小组"} />
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
			</Drawer>
		);
	}
}

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainDrawer);
