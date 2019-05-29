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
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
    root: {
        width: 360,
        marginLeft: "auto",
        marginRight: "auto"
    },
    redButton: {
        backgroundColor: red[500],
        color: "#FFF"
    },
    greenButton: {
        backgroundColor: green[500],
        color: "#FFF"
    },
    textField: {
        width: "100%"
    }
});

class NumberDashboard extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [Stores.view.dialog, Stores.page.randomizer];
    }

    handleCloseDialog = Actions.view.dialog.reset;

    render() {
        const { classes, theme } = this.props;

        return (
            <Dialog
                open={this.state.show == 'numberDashboard'}
                onClose={this.handleCloseDialog}
                scroll="paper"
                className={classes.root}
            >
                <DialogTitle>设置人数</DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                id="count"
                                label="人数"
                                value={this.state.generateCount}
                                onChange={e => Actions.views.randomizer.handleChangeGenerateCount(e.target.value)}
                                margin="normal"
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>1</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>2</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>3</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar className={classes.redButton}>{"<"}</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>4</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>5</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>6</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>0</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>7</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>8</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar>9</Avatar>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton>
                                <Avatar className={classes.greenButton}>✔</Avatar>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                        {"完成"}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(NumberDashboard);