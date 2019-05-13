import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import red from '@material-ui/core/colors/red';

import Appbar from "./views/appbar";
import WindowManager from "./views/windowManager";
import FabView from "./views/fab";

import Picker from "./pages/picker";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#006064',
        },
        secondary: {
            main: '#006064',
        },
        error: red
    },
    typography: {
        useNextVariants: true,
    }
});

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
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Appbar />
                        <WindowManager />

                        <div className={classes.toolbar} />

                        <Switch>
                            <Route exact path='/index' component={() => <Picker />} />
                            <Route path='/another' component={() => <Picker />} />
                            <Redirect path="/" to={{ pathname: '/index' }} />
                        </Switch>
                    </BrowserRouter>

                </MuiThemeProvider>
            </div>
        );
    }
}

Root.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);