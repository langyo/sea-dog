import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ClassTable from "../../pages/classTable";
import ClassMap from "../../pages/classMap";

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

class ClassTableRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.drawer];
  }

  handleChange = (n, value) => Actions.view.drawer.toggleTo(value);
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tabs
          value={this.state.show}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="secondary"
          centered
          className={classes.tab}>
          <Tab value="classTable" label="座位表" />
          <Tab value="classMap" label="课程表" />
        </Tabs>

        {this.state.show == "classTable" && <ClassTable />}
        {this.state.show == "classMap" && <ClassMap />}
      </div>
    );
  }
}

export default withStyles(styles)(ClassTableRouter);