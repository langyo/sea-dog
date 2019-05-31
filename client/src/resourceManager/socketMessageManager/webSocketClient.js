import PluginDashboard from "./pluginDashboard";
import { EventEmitter } from 'events';

let client = new WebSocket("ws://localhost:9201");

let dashboard;

let clientConnectionEventEmitter = new EventEmitter();

console.log(client);

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

export let send = (...data) => client.send(data);

export let register = (obj) => client.register(obj);

export let receive = (obj) => client.receive(obj);

export let connectionEvents = clientConnectionEventEmitter;