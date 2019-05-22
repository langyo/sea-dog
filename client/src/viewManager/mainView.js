import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import red from '@material-ui/core/colors/red';

import Appbar from "./views/appbar";
import WindowManager from "./views/windowManager";
import FabView from "./views/fab";

import Broadcast from "./pages/broadcasts";
import Account from "./pages/account";
import AccountMobile from "./pages/accountMobile";
import ClassChoiceDesktop from "./pages/classChoiceDesktop";
import ClassMap from "./pages/classMap";
import ClassTable from "./pages/classTable";
import Management from "./pages/management";
import Picker from "./pages/picker";
import Randomizer from "./pages/randomizer";
import Practise from "./pages/practise";
import Rank from "./pages/rank";

import Stores from '../resourceManager/stores';
import Actions from "../resourceManager/actions";

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
        border: 0
    },
    toolbar: theme.mixins.toolbar
});

class Root extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [Stores.view.drawer, Stores.view.theme];
    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MuiThemeProvider theme={createMuiTheme({
                    palette: {
                        primary: {
                            main: this.state.primaryColor
                        },
                        secondary: {
                            main: this.state.secondaryColor
                        },
                        error: red
                    },
                    typography: {
                        useNextVariants: true,
                    }
                })}>
                    <Appbar />
                    <WindowManager />

                    <div className={classes.toolbar} />

                    {this.state.show == "" && <Broadcast />}
                    {this.state.show == "picker" && <Picker />}
                    {this.state.show == "randomizer" && <Randomizer />}
                </MuiThemeProvider>
            </div>
        );
    }
}

Root.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);