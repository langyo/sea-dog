import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Broadcasts from "../../pages/broadcasts";

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

class MainPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.drawer];
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Broadcasts />
      </div>
    );
  }
}

export default withStyles(styles)(MainPage);