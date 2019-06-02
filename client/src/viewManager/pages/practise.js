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

import PacManIcon from "mdi-material-ui/PacMan";
import StopIcon from "mdi-material-ui/StopCircleOutline";
import MoreVertIcon from "mdi-material-ui/DotsVertical";
import PlusIcon from "mdi-material-ui/Plus";
import MinusIcon from "mdi-material-ui/Minus";
import KeyboardIcon from "mdi-material-ui/KeyboardOutline";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
  card: {
    width: 500,
    opacity: 0.8,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30
  }
});

class Practise extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.page.randomizer;
  }

  render() {
    const { classes } = this.props;

    return (
      <Fade in={true}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5">
                开发中，尽情期待
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Fade>
    );
  }
}

Practise.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(Practise);
