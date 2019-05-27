import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Rank from "../../pages/rank";

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

class RankList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.drawer];
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Rank />
      </div>
    );
  }
}

export default withStyles(styles)(RankList);