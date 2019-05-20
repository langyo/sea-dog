import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import PacManIcon from "mdi-material-ui/PacMan";
import StopIcon from "mdi-material-ui/StopCircleOutline";
import MoreVertIcon from "mdi-material-ui/DotsVertical";
import PlusIcon from "mdi-material-ui/Plus";
import MinusIcon from "mdi-material-ui/Minus";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";
import actions from "../../resourceManager/actions";

const styles = theme => ({
  button: {
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    transform: "translateX(40px)"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  card: {
    width: 300,
    opacity: 0.8,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    marginTop: 30
  },
  left: {
    marginRight: "auto"
  },
  right: {
    marginLeft: "auto"
  }
});

class Picker extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.page.picker;
  }

  handleRoundingToggle = () => {
    this.setState({ rounding: !this.state.rounding });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {this.state.nowSelecting}
          </Typography>
          <Typography variant="caption" gutterBottom>
            当前正在抽取 ，共 人
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className={classes.left}
            color="primary"
            onClick={Actions.page.picker.scoreRemoveOne}
          >
            <MinusIcon />
          </IconButton>
          <Typography
            className={classNames(classes.left, classes.right)}
            variant="h2"
          >
            {this.state.score}
          </Typography>
          <IconButton
            className={classes.right}
            variant="outlined"
            color="primary"
            onClick={Actions.page.picker.scoreAddOne}
          >
            <PlusIcon />
          </IconButton>
        </CardActions>
        <CardActions>
          <Button
            className={classNames(classes.button)}
            variant="contained"
            color="primary"
            onClick={this.handleRoundingToggle}
            size="large"
          >
            {!this.state.rounding && (
              <PacManIcon className={classes.extendedIcon} />
            )}
            {!this.state.rounding && "开始点名"}
            {this.state.rounding && (
              <StopIcon className={classes.extendedIcon} />

            )}
            {this.state.rounding && "停！"}
          </Button>
          <IconButton className={classes.right}>
            <MoreVertIcon />
          </IconButton>
          )}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Picker);
