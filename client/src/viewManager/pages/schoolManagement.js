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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import MoreIcon from "mdi-material-ui/DotsVertical";
import AddIcon from "mdi-material-ui/Plus";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
  card: {
    width: 400,
    opacity: 0.8,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30
  },
  table: {
    width: "100%"
  },
  marginLeft: {
    marginLeft: "auto"
  }
});

class SchoolManagement extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.page.schoolManagement;
  }

  render() {
    const { classes } = this.props;

    return (
      <Fade in={true}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Toolbar>
                <Typography variant="h6">
                  年级账户管理
                </Typography>
                <Tooltip title="添加">
                  <IconButton className={classes.marginLeft} onClick={() => Actions.view.dialog.toggleTo("appendAccount")}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Toolbar>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={true}
                        direction={"asc"}
                        onClick={() => null}
                      >
                        账户名
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={true}
                        direction={"asc"}
                        onClick={() => null}
                      >
                        所属班级
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={true}
                        direction={"asc"}
                        onClick={() => null}
                      >
                        个人分数
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      操作
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: "张三", className: "1", score: "32" },
                    { name: "张三", className: "1", score: "32" },
                    { name: "张三", className: "1", score: "32" },
                    { name: "张三", className: "1", score: "32" },
                    { name: "张三", className: "1", score: "32" },
                    { name: "张三", className: "1", score: "32" }
                  ].map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.className}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <MoreIcon />
                        </IconButton>
                      </TableCell>
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

SchoolManagement.propTypes = {
  open: PropTypes.bool
}

export default withStyles(styles)(SchoolManagement);
