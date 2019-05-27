import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Account from "../../pages/account";
import AccountMobile from "../../pages/accountMobile";

import Stores from '../../../resourceManager/stores';
import Actions from "../../../resourceManager/actions";

const styles = theme => ({
  tab: {
    background: "rgba(255, 255, 255, 0.7)",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class AccountDashboard extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.drawer];
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Account />
      </div>
    );
  }
}

export default withStyles(styles)(AccountDashboard);