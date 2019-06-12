import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Classes extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            classes: []
        };
        this.listenToMany(Actions.database.classes);
    }

    // 用于获取 ID 列表
    generateList(from, globalCount) {
        const skip = 10;
        let to = from + skip;
        if (from >= globalCount) return;
        else if (to >= globalCount) to = globalCount - 1;
        send("execute", "database list classes run list", from + ".." + to);
        this.generateList(to + 1, globalCount);
    }

    // 用于读取 ID 列表中各个 ID 对应对象的数据
    initializeList(list) {
        let n = this.state.classes;

        // 初始化
        for (let i of list) n[i] = {};
        this.setState({ classes: n });

        // 对每一项逐个请求
        for (let i of list) {
            send("execute", "database at classes", i, "run get", "name");
        }
    }

    updateByDatabase(id, key, value) {
        let n = this.state.classes[id];
        n[key] = value;
        this.setState({
            classes: n
        });
        console.log("当前的 classes：", n);
    }

    addGroup() {

    }

    addMember() {

    }

    removeGroup() {

    }

    removeMember() {

    }

    updateGroup() {

    }

    updateMember() {

    }
}

export default new Classes();