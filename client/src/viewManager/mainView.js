import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import red from '@material-ui/core/colors/red';

import CustomScroll from 'react-custom-scroll';

import Appbar from "./views/appbar";
import WindowManager from "./views/windowManager";
import FabView from "./views/fab";

import AccountDashboard from "./views/routeDesktop/accountDashboard";
import DeviceDashboard from "./views/routeDesktop/deviceDashboard";
import MainPage from "./views/routeDesktop/mainPage";
import Picker from "./views/routeDesktop/picker";
import ClassTable from "./views/routeDesktop/classTable";
import Practise from "./views/routeDesktop/practise";
import RankList from "./views/routeDesktop/rankList";
import Management from "./views/routeDesktop/management";

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
  toolbar: theme.mixins.toolbar,
  body: {
    overflow: 'hidden',
    maxHeight: 'calc(100%)'
  }
});

class Root extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.drawer, Stores.view.theme];
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    console.log(this.state.isDesktop);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => Actions.view.theme.handleResize(document.body.scrollWidth >= 600);

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


          <CustomScroll allowOuterScroll>
            <div className={classes.body}>
              {this.state.isDesktop && <div>
                {
                  [""]
                    .indexOf(this.state.show) != -1
                  && <MainPage />
                }
                {
                  ["picker", "randomizer", "groupPicker"]
                    .indexOf(this.state.show) != -1
                  && <Picker />
                }
                {
                  ["classTable", "classMap"]
                    .indexOf(this.state.show) != -1
                  && <ClassTable />
                }
                {
                  ["rankGroup", "rankClass"]
                    .indexOf(this.state.show) != -1 && <RankList />
                }
                {
                  ["tests", "questions", "test", "question"]
                    .indexOf(this.state.show) != -1
                  && <Practise />
                }
                {
                  ["classManagement", "schoolManagement"]
                    .indexOf(this.state.show) != -1
                  && <Management />
                }
              </div>}

              {!this.state.isDesktop && <div>
                {
                  [""]
                    .indexOf(this.state.show) != -1
                  && <MainPage />
                }
                {
                  ["picker", "randomizer", "groupPicker"]
                    .indexOf(this.state.show) != -1
                  && <Picker />
                }
                {
                  ["classTable", "classMap"]
                    .indexOf(this.state.show) != -1
                  && <ClassTable />
                }
                {
                  ["rankGroup", "rankClass"]
                    .indexOf(this.state.show) != -1 && <RankList />
                }
                {
                  ["tests", "questions", "test", "question"]
                    .indexOf(this.state.show) != -1
                  && <Practise />
                }
              </div>}
            </div>
          </CustomScroll>

        </MuiThemeProvider>
      </div>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);