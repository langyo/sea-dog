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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  },
  table: {
    width: "100%"
  }
});

class Management extends Reflux.Component {
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
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>账户名</TableCell>
                    <TableCell align="right">所属班级</TableCell>
                    <TableCell align="right">个人分数</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: "张三", group: "1", score: "32"},
                    { name: "张三", group: "1", score: "32"},
                    { name: "张三", group: "1", score: "32"},
                    { name: "张三", group: "1", score: "32"},
                    { name: "张三", group: "1", score: "32"},
                    { name: "张三", group: "1", score: "32"}
                  ].map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.group}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Fade>
    );
  }
}

Management.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(Management);
