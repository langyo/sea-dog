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
                    title: "欢迎使用「海点」！",
                    date: getNowDate(),
                    description: "海点是一套为校园提供课上点名、加分与排名的信息平台，可用于丰富课堂体验、提高课堂效率。\n这是一个响应式单页面应用，并且依赖于在线数据库。您可以在任何带有现代浏览器的平台上使用本应用。请注意使用时保证网络畅通！\n点击左上角的菜单按钮开始使用！~"
                },
                {
                    title: "依赖库说明",
                    date: getNowDate(),
                    description: "基底：Node.js\n前端页面构建：React、Reflux、Material-UI、mdi-material-ui\n后端通讯与数据库：Socket.io-websocket、Mongoose、MongoDB、Express\n服务器提供商：阿里云"
                }
            ]
        };
        this.listenToMany(Actions.view.drawer);
    }

    update(name) {

    }
}

export default new Drawer();