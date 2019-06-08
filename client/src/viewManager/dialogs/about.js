import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
});

class About extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.view.dialog;
  }

  handleCloseDialog = Actions.view.dialog.reset;

  render() {
    const { classes, theme } = this.props;

    return (
      <Dialog
        open={this.state.show == 'about'}
        onClose={this.handleCloseDialog}
        scroll="paper"
      >
        <DialogTitle>关于</DialogTitle>
        <DialogContent>
          <Typography paragraph variant="body1">
            欢迎使用“海点”点名器！
          </Typography>
          <Typography paragraph variant="body1">
            海点是一款专用于校园的点评服务套件，同时包含客户端与服务端，用于课上的点名、加分，以提高学生课堂效率。
          </Typography>
          <Typography paragraph variant="body1">
            sea dog 不是海狗！它是俚语，意思是“老水手”~
          </Typography>
          <Typography paragraph variant="body1">
            该套件最初是为本人的物理老师开发的，但后来恰逢学校提出了加分机制，于是本人就灵光一闪，尝试为这套机制配上实施的硬件。
          </Typography>
          <Typography paragraph variant="body1">
            海纳百川，有容乃大。这个套件致力于优化课堂体验，不止步于点名，也不止步于加分，一切可能会对课堂有所帮助的功能都会逐渐地加入进来，造福社会。
          </Typography>
          <Typography paragraph variant="body1">
            Enjoy!
          </Typography>
          <Button variant="contained" onClick={() => window.open("https://github.com/langyo/sea-dog")}>
            该软件的开源地址
          </Button>
          <Typography paragraph variant="body1">
            (https://github.com/langyo/sea-dog)
          </Typography>
          <Typography paragraph variant="body1">
            目前该软件仍然处于半完工状态，版本在所有基本功能完成之前一直会定格在 v0.1.0。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            {"确定"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(About);