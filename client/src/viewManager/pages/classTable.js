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
  root: {
    width: 400,
    height: "100%",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 30,
    background: "rgba(255, 255, 255, 0.6)"
  },
  card: {
    width: 116 + 84 * 2,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    opacity: 0.8,
    margin: 10
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
        <div className={classes.root}>
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
      </Fade>
    );
  }
}

ClassTable.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(ClassTable);
