import Reflux from "reflux";

import db from "../database";

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const getNowDate = () => {
    var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};

class Drawer extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            broadcasts: [
                {
                    title: "正在建设中",
                    date: getNowDate(),
                    description: "现在正在建设，请耐心等待……"
                }
            ]
        };
        this.listenToMany(Actions.view.drawer);
    }

    update(name) {

    }
}

export default new Drawer();