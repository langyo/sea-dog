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
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
});

class About extends Reflux.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <Dialog open={true}>
                <DialogContent>
                    <CircularProgress color="primary" size={70} />
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(About);