import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "mdi-material-ui/Menu";
import ReactSVG from "react-svg";

import Drawer from "./drawer";
import BottomNavigation from "./bottomNavigation";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing.unit * 2
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: 250,
    flexShrink: 0
  },
  svg: {
    width: 36,
    height: 36
  }
});

class MainAppbar extends Reflux.Component {
  constructor(props) {
    super(props);

    this.stores = [Stores.view.theme, Stores.view.drawer];
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {
              (!this.state.isDesktop && this.state.menuTheme == 'android') && (<IconButton
                color="inherit"
                aria-label="打开侧边栏"
                onClick={Actions.view.drawer.toggleDrawerOpen}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>)
            }
            {
              (this.state.isDesktop || !this.state.isDesktop && this.state.menuTheme == 'ios') && <ReactSVG src="./logo.svg" className={classNames(classes.menuButton, classes.svg)} />
            }
            <Typography variant="h6" color="inherit" noWrap>
              海点
            </Typography>
          </Toolbar>
        </AppBar>
        {(this.state.menuTheme == 'android' || this.state.isDesktop) && <Drawer
          className={classes.drawer}
          isDesktop={this.state.isDesktop}
        />}
        {!this.state.isDesktop && this.state.menuTheme == 'ios' && <BottomNavigation />}
      </div>
    )
  }
}

MainAppbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainAppbar);
