import PluginDashboard from "./pluginDashboard";
import { EventEmitter } from 'events';

let client = new WebSocket("ws://localhost:9201");

let dashboard;

let clientConnectionEventEmitter = new EventEmitter();

client.onopen = () => {
    console.log("连接成功！");
    client.send("execute system register h5");
};

client.onmessage = (data) => {
    if(data.data == "data system register ok") {
        console.log("认证成功！");
        dashboard = new PluginDashboard(client);
        clientConnectionEventEmitter.emit("load");
    }
};

export let send = (...data) => dashboard.send(data);

export let register = (obj) => dashboard.register(obj);

export let receive = (obj) => dashboard.receive(obj);

export let connectionEvents = clientConnectionEventEmitter;