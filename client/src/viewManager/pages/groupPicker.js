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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    marginTop: 30
  }
});

class Randomizer extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.page.randomizer;
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
              <List>
                <ListItem>
                  <Typography variant="h5">
                    开发中，尽情期待
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </Fade>
    );
  }
}

Randomizer.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(Randomizer);
