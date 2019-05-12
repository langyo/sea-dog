import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import PacManIcon from "mdi-material-ui/PacMan";
import StopIcon from "mdi-material-ui/StopCircleOutline";

import Stores from '../../resourceManager/stores';

const styles = theme => ({
    button: {
        width: 150,
        marginLeft: "auto",
        marginRight: "auto"
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    card: {
        width: 280,
        opacity: 0.8,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    }
});

let randomNum = (minNum, maxNum) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

class Picker extends Reflux.Component {
    state = {
        rounding: false,
        timeInterval: 100,

        choosingGroup: 0,
        groupChangeName: "",
        groupChangeBody: "",
        nowSelectedLuckyGuy: "点击开始",
        groups: JSON.parse(localStorage.getItem("cache")).list
    }

    handleRoundingToggle = () => {
        this.setState({ rounding: !this.state.rounding }, () => {
            if (this.state.rounding) {
                this.timer = setInterval(() => {
                    let members = this.state.groups[this.state.choosingGroup].members;
                    let picked = randomNum(0, members.length - 1);
                    this.setState({ nowSelectedLuckyGuy: this.state.groups[this.state.choosingGroup].members[picked] });
                }, this.state.timeInterval);
            } else {
                clearInterval(this.timer);
            }
        });
    }

    randomTimerObject = null;

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {this.state.nowSelectedLuckyGuy}
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        当前正在抽取 {this.state.groups[this.state.choosingGroup] && this.state.groups[this.state.choosingGroup].name} ，共 {this.state.groups[this.state.choosingGroup] && this.state.groups[this.state.choosingGroup].members.length} 人
                    </Typography>
                </CardContent>
                <CardActions>
                    {(!this.state.rounding) && (<Button
                        className={classNames(classes.button)}
                        variant="contained"
                        color="primary"
                        onClick={this.handleRoundingToggle}
                        size="large"
                    >
                        <PacManIcon className={classes.extendedIcon} />
                        开始点名
                    </Button>)}
                    {(this.state.rounding) && (<Button
                        className={classNames(classes.button)}
                        variant="contained"
                        color="primary"
                        onClick={this.handleRoundingToggle}
                        size="large"
                    >
                        <StopIcon className={classes.extendedIcon} />
                        停！
                    </Button>)}
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(Picker);