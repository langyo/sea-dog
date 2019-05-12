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
        this.store = Stores.view.global.dialog;
    }

    handleCloseDialog = Actions.view.global.dialog.reset;

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
                        有道“海纳百川，有容乃大”，本款点名器以此为寓意，希望既能起到点名的作用，又能让使用本点名器的课堂或者活动有着大海一般的希望和深度。
                    </Typography>
                    <Button variant="contained" onClick={() => window.open("https://github.com/langyo/sea-dog")}>
                        该软件的开源地址
                    </Button>
                    <Typography paragraph variant="body1">
                        (https://github.com/langyo/sea-dog)
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