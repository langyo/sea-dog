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
  },
  textLeft: {
    textAlign: "left"
  },
  textRight: {
    textAlign: "Right"
  }
});

class Picker extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.page.broadcast;
  }

  handleRoundingToggle = () => {
    this.setState({ rounding: !this.state.rounding });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fade in={true}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              {
                this.state.broadcasts.map((n, index) => (
                  <div key={index}>
                    <Typography variant="h5" className={classes.textLeft}>
                      {n.title}
                    </Typography>
                    <Typography variant="caption" className={classes.textLeft}>
                      {n.date}
                    </Typography>
                    <Typography variant="body1" className={classes.textLeft}>
                      {n.description}
                    </Typography>
                  </div>
                ))
              }
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
