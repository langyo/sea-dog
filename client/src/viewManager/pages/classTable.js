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
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import MoreIcon from "mdi-material-ui/DotsVertical";

import Scroll from "react-scrollbar";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
  outerContainer: {
    width: 400,
    height: 600,
    border: "1px solid white",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.2)"
  },
  innerContainer: {
    position: "absolute",
    overflowX: "hidden",
    overflowY: "scroll",
    left: 0
  },
  card: {
    width: 116 + 84 * 1,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    margin: 30
  },
  avatarButton: {
    margin: 10
  },
  moreButton: {
    marginLeft: "auto"
  }
});

class ClassTable extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.page.randomizer;
  }

  render() {
    const { classes } = this.props;

    return (
      <Fade in={true}>
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    {["喵", "喵", "喵", "喵", "喵", "喵", "喵", "喵"].map(n => (
                      <IconButton className={classes.avatarButton}>
                        <Avatar>{n}</Avatar>
                      </IconButton>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions>
                  <IconButton className={classes.moreButton}>
                    <MoreIcon />
                  </IconButton>
                </CardActions>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    {["喵", "喵", "喵", "喵", "喵", "喵", "喵", "喵"].map(n => (
                      <IconButton className={classes.avatarButton}>
                        <Avatar>{n}</Avatar>
                      </IconButton>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions>
                  <IconButton className={classes.moreButton}>
                    <MoreIcon />
                  </IconButton>
                </CardActions>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    {["喵", "喵", "喵", "喵", "喵", "喵", "喵", "喵"].map(n => (
                      <IconButton className={classes.avatarButton}>
                        <Avatar>{n}</Avatar>
                      </IconButton>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions>
                  <IconButton className={classes.moreButton}>
                    <MoreIcon />
                  </IconButton>
                </CardActions>
              </Card>
          </div>
        </div>
      </Fade>
    );
  }
}

ClassTable.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(ClassTable);
