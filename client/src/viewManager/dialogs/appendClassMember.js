import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
  root: {
    width: 600,
    marginLeft: "auto",
    marginRight: "auto"
  },
  content: {
    display: "flex",
    flexWarp: "warp"
  },
  textField: {
    width: 500
  },
  menu: {
    width: 300
  }
});

class AppendClassMember extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.dialog];
  }

  handleCloseDialog = Actions.view.dialog.reset;

  render() {
    const { classes, theme } = this.props;

    return (
      <Dialog
        open={this.state.show == 'appendClassMember'}
        onClose={this.handleCloseDialog}
        scroll="paper"
        className={classes.root}
      >
        <DialogTitle>添加新的成员</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            id="list"
            label="成员名单"
            value={"123"}
            onChange={e => Actions.page.classManagement.handleAddNewListInput(e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows="4"
            fullwidth
            className={classes.textField}
          />
          <TextField
            id="group-global"
            select
            label="选择小组类别"
            className={classes.textField}
            value={1}
            onChange={null}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={31}>31</MenuItem>
          </TextField>
          <TextField
            id="group-sub"
            select
            label="选择具体小组"
            className={classes.textField}
            value={1}
            onChange={null}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={31}>31</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            {"确定"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AppendClassMember);