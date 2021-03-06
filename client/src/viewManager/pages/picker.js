import React, { useCallback } from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

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

const styles = theme => ({
  button: {
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    transform: "translateX(60px)"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  card: {
    width: 400,
    opacity: 0.8,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30
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
    if(this.state.working) Actions.page.picker.closeRandomPicker();
    else Actions.page.picker.openRandomPicker();
  };

  render() {
    const { classes } = this.props;

    return (
      <Fade in={true}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {this.state.nowSelectingLuckyGuy}
              </Typography>
              <Typography variant="caption" gutterBottom>
                当前正在抽取 ，共 人
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classNames(classes.button)}
                variant="contained"
                color="primary"
                onClick={this.handleRoundingToggle}
                size="large"
              >
                {!this.state.working && (
                  <PacManIcon className={classes.extendedIcon} />
                )}
                {!this.state.working && "开始点名"}
                {this.state.working && (
                  <StopIcon className={classes.extendedIcon} />

                )}
                {this.state.working && "停！"}
              </Button>
              <IconButton className={classes.right}>
                <MoreVertIcon />
              </IconButton>
              )}
        </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">
                本节课个人分数
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                className={classes.left}
                variant="outlined"
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
                color="primary"
                onClick={Actions.page.picker.scoreAddOne}
              >
                <PlusIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">
                战绩
              </Typography>
              <Typography variant="body1">
                本节课已获得：0
              </Typography>
              <Typography variant="body1">
                今日已获得： 0
              </Typography>
              <Typography variant="body1">
                本周已获得：0
              </Typography>
              <Typography variant="body1">
                本月已获得：0
              </Typography>
              <Typography variant="body1">
                所在小组总分：0
              </Typography>
              <Typography variant="body1">
                所在小组排名：0
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Fade>
    );
  }
}

Picker.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(Picker);
