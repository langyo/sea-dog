import PluginDashboard from "./pluginDashboard";
import { EventEmitter } from 'events';

import Actions from "../actions";

let client = new WebSocket("ws://seadog.langyo.xyz:9201");
// let client = new WebSocket("ws://localhost:9201");

let dashboard;

let connectionEmitter = new EventEmitter().setMaxListeners(0);
let dashboardEmitter = new EventEmitter().setMaxListeners(0);

client.onopen = () => {
    console.log("连接成功！");
    Actions.view.system.toggleNetworkState("success");
    client.send("execute system register h5");
};

client.onmessage = (data) => {
    if (data.data == "data system register ok") {
        console.log("认证成功！");
        dashboard = new PluginDashboard(client);
        dashboardEmitter.on('send', (msg) => dashboard.send(msg));
        dashboardEmitter.on('register', (obj) => dashboard.register(obj));
        dashboardEmitter.on('receive', (obj) => dashboard.receive(obj));
        connectionEmitter.emit("load");
    }
};

client.onerror = (err) => console.error(err);

export let send = (...data) => {
    if(dashboard) dashboardEmitter.emit('send', data);
    else connectionEmitter.on('ready', () => dashboardEmitter.emit('send', data), console.log("已注册 send", data));
};

export let register = (obj) => {
    if(dashboard) dashboardEmitter.emit('register', obj);
    else connectionEmitter.on('ready', () => dashboardEmitter.emit('register', obj), console.log("已注册 register", obj));
};

export let receive = (obj) => {
    if(dashboard) dashboardEmitter.emit('receive', obj);
    else connectionEmitter.on('ready', () => dashboardEmitter.emit('receive', obj), console.log("已注册 receive", obj));
};

export let connectionEvents = connectionEmitter;