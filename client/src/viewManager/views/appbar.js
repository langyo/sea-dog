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
import PacManIcon from "mdi-material-ui/PacMan";

import Drawer from "./drawer";
import BottomNavigation from "./bottomNavigation";

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
});

class MainAppbar extends Reflux.Component {
    state = {
        drawerOpen: false,
        isDesktop: document.body.scrollWidth >= 600,
        menuTheme: 'ios'    // Android 版为左侧抽屉，ios 版为底部选择器
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({isDesktop: document.body.scrollWidth >= 600});
    };

    toggleDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    };

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
                                onClick={this.toggleDrawer}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>)
                        }
                        {
                            (this.state.isDesktop || !this.state.isDesktop && this.state.menuTheme == 'ios') && <PacManIcon className={classes.menuButton} />
                        }
                        <Typography variant="h6" color="inherit" noWrap>
                            海点
                        </Typography>
                    </Toolbar>
                </AppBar>
                {(this.state.menuTheme == 'android' || this.state.isDesktop) && <Drawer
                    className={classes.drawer}
                    open={this.state.isDesktop || this.state.drawerOpen}
                    onToggle={this.toggleDrawer}
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
