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
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
  textField: {
    width: "100%"
  },
  formControl: {
    width: "100%"
  }
});

class AppendAccount extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.dialog];
  }

  handleCloseDialog = Actions.view.dialog.reset;

  render() {
    const { classes, theme } = this.props;

    return (
      <Dialog
        open={this.state.show == 'appendAccount'}
        onClose={this.handleCloseDialog}
        scroll="paper"
        className={classes.root}
      >
        <DialogTitle>添加新的账户</DialogTitle>
        <DialogContent>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <TextField
                id="list"
                label="账户名单"
                value={""}
                onChange={e => e.target.value}
                margin="normal"
                variant="outlined"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="group-type">选择用户组类别</InputLabel>
                <Select
                  value={""}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput labelWidth={200} name="group" id="group-type" />
                  }
                >
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="group-type">选择用户组</InputLabel>
                <Select
                  value={""}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput labelWidth={200} name="group" id="group-type" />
                  }
                >
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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

export default withStyles(styles)(AppendAccount);