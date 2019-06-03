import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from "mdi-material-ui/Home";
import AccountIcon from "mdi-material-ui/AccountCircleOutline";
import PickStudentIcon from "mdi-material-ui/CursorDefaultClickOutline";
import RankIcon from "mdi-material-ui/TrophyVariantOutline";
import PaperIcon from "mdi-material-ui/NoteOutline";

import Stores from "../../resourceManager/stores";
import Actions from "../../resourceManager/actions";
import zIndex from "@material-ui/core/styles/zIndex";

const styles = theme => ({
    root: {
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
        zIndex: "1"
    }
});

class TheBottomNavigation extends Reflux.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value: value });
      console.log("mobile toggle to", value);
      Actions.view.drawer.toggleTo(value);
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        <BottomNavigation
          value={this.value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="主页" value="" icon={<HomeIcon />} />
          <BottomNavigationAction label="点名" value="picker" icon={<PickStudentIcon />} />
          <BottomNavigationAction label="排行榜" value="rankGroup" icon={<RankIcon />} />
          <BottomNavigationAction label="课堂小练" value="tests" icon={<PaperIcon />} />
          <BottomNavigationAction label="我" value="me" icon={<AccountIcon />} />
        </BottomNavigation>
      );
    }
  }
  
  TheBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TheBottomNavigation);