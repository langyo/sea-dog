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
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
});

class Setting extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [
            Stores.view.dialog, Stores.view.theme
        ];
    }

    handleCloseDialog = Actions.view.dialog.reset;

    render() {
        const { classes, theme } = this.props;

        return (
            <Dialog
                open={this.state.show == 'setting'}
                onClose={this.handleCloseDialog}
                scroll="paper"
            >
                <DialogTitle>设置</DialogTitle>
                <DialogContent>
                    <Typography paragraph variant="h5">
                        常规
                    </Typography>
                    <FormGroup>
                        <RadioGroup
                            name="主题"
                            value={this.state.menuTheme}
                            onChange={event => Actions.view.theme.toggleMenuTheme(event.target.value)}
                        >
                            <FormControlLabel value="android" control={<Radio />} label="Android 风格" />
                            <FormControlLabel value="ios" control={<Radio />} label="iOS 风格" />
                        </RadioGroup>
                    </FormGroup>
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

export default withStyles(styles)(Setting);