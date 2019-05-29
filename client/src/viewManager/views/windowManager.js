import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import Stores from '../../resourceManager/stores';

import AboutDialog from '../dialogs/about';
import SettingDialog from '../dialogs/setting';
import NumberDashboardDialog from "../dialogs/numberDashboard";
import BindClassDesktopDialog from "../dialogs/bindClassDesktop";

class MainWindowManager extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.view.dialog;
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <AboutDialog />
        <SettingDialog />
        <NumberDashboardDialog />
        <BindClassDesktopDialog />
      </div>
    );
  }
}

export default MainWindowManager;
