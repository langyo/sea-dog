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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Switch from "@material-ui/core/Switch";

import PacManIcon from "mdi-material-ui/PacMan";
import StopIcon from "mdi-material-ui/StopCircleOutline";
import MoreVertIcon from "mdi-material-ui/DotsVertical";
import PlusIcon from "mdi-material-ui/Plus";
import MinusIcon from "mdi-material-ui/Minus";
import KeyboardIcon from "mdi-material-ui/KeyboardOutline";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
  button: {
    width: 150,
    marginRight: "auto",
    marginLeft: 20
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  card: {
    width: 500,
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
  scoreText: {
    width: 40,
    textAlign: "center"
  },
  peopleName: {
    marginLeft: 20,
    marginRight: "auto"
  },
  peopleGroup: {
    border: "2px solid #aaa",
    borderRadius: 5
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  },
  switch: {
    marginRight: 10
  }
});

class GroupPicker extends Reflux.Component {
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
      <Fade in={true}>
        <div>
          <Card className={classes.card}>
            <CardActions>
              {!this.state.rounding && (
                <Button
                  className={classNames(classes.button)}
                  variant="contained"
                  color="primary"
                  onClick={this.handleRoundingToggle}
                  size="large"
                >
                  <PacManIcon className={classes.extendedIcon} />
                  开始点名
              </Button>
              )}
              {this.state.rounding && (
                <Button
                  className={classNames(classes.button)}
                  variant="contained"
                  color="primary"
                  onClick={this.handleRoundingToggle}
                  size="large"
                >
                  <StopIcon className={classes.extendedIcon} />
                  停！
              </Button>
              )}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="group-type">选择小组分类方式</InputLabel>
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
            </CardActions>
            <CardContent>
              <List>
                <ListItem>
                  <Switch className={classes.switch} color="primary" />
                  <Typography variant="h5" className={classes.peopleGroup}>
                    测试组名
                  </Typography>
                  <Typography variant="h5" className={classes.peopleName}>
                    测试用户
                  </Typography>
                  <IconButton color="primary">
                    <MinusIcon />
                  </IconButton>
                  <Typography className={classes.scoreText} variant="h4">
                    0
                  </Typography>
                  <IconButton color="primary">
                    <PlusIcon />
                  </IconButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </Fade>
    );
  }
}

export default withStyles(styles)(GroupPicker);
