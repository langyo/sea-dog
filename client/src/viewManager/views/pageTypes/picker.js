import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Picker from "../../pages/picker";
import Randomizer from "../../pages/randomizer";
import GroupPicker from "../../pages/groupPicker";

const styles = theme => ({
  tab: {
    background: "rgba(255, 255, 255, 0.7)",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class TabsWrappedLabel extends Reflux.Component {
  state = {
    value: "picker"
  }

  handleChange = (n, value) => this.setState({ value: value });

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="secondary"
          centered
          className={classes.tab}>
          <Tab value="picker" label="单人点名" />
          <Tab value="randomizer" label="批量点名" />
          <Tab value="groupPicker" label="小组代表点名" />
        </Tabs>

        {this.state.value === 'picker' && <Picker />}
        {this.state.value === 'randomizer' && <Randomizer />}
        {this.state.value === 'groupPicker' && <GroupPicker />}
      </div>
    );
  }
}

export default withStyles(styles)(TabsWrappedLabel);