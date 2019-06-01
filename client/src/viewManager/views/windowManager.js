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
import AppendAccountDialog from "../dialogs/appendAccount";
import AppendClassMemberDialog from "../dialogs/appendClassMember";

import DatabaseLoadingDialog from "../dialogs/databaseLoading";

class MainWindowManager extends Reflux.Component {
  constructor(props) {
    super(props);
    
    this.store = Stores.view.system;
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <AboutDialog />
        <SettingDialog />
        <NumberDashboardDialog />
        <BindClassDesktopDialog />
        <AppendAccountDialog />
        <AppendClassMemberDialog />

        {this.state.databaseState != "ready" && <DatabaseLoadingDialog />}
      </div>
    );
  }
}

export default MainWindowManager;
