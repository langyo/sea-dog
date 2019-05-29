import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ClassManager from "../../pages/classManagement";
import SchoolManager from "../../pages/schoolManagement";

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

class Management extends Reflux.Component {
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
          <Tab value="classManagement" label="班级成员管理" />
          <Tab value="schoolManagement" label="学校账户管理" />
        </Tabs>

        {this.state.show == "classManagement" && <ClassManager />}
        {this.state.show == "schoolManagement" && <SchoolManager />}
      </div>
    );
  }
}

export default withStyles(styles)(Management);