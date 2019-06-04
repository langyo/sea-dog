import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Picker extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            score: 0,

            nowSelectingLuckyGuy: "点击开始",
            nowSelectingGroup: '',
            nowSelectingGroupType: '',
            nowSelectingClass: '',

            working: false
        };
        this.listenToMany(Actions.page.picker);
    }

    list = [
        '张三',
        '李四',
        '王五'
    ]

    scoreAddOne() {
        this.setState({ score: this.state.score + 1 })
    }

    scoreRemoveOne() {
        this.setState({ score: this.state.score - 1 })
    }

    openRandomPicker() {
        // const { accounts, groups, nowSelectingGroup} = this.state;

        // if(!groups[nowSelectingGroup]) return;

        // this.list = groups[nowSelectingGroup].members.map(n => accounts[n.id].name);

        this.setState(state => {
            state.working = true
            return state;
        }, this.generateRandom)
    }

    generateRandom() {
        console.log(0)
        this.setState(state => {
            state.nowSelectingLuckyGuy = this.list[Math.random() * this.list.length];
            console.log(1);
            return state;
        }, () => {
            console.log(2);
            if(this.state.working) requestAnimationFrame(this.generateRandom);
        })
    }

    closeRandomPicker() {
        this.setState({ working: false });
    }
}

export default new Picker();