import PluginDashboard from "./pluginDashboard";
let WebSocket = eval('require\("ws"\)');

const server = new WebSocket.Server({ port: 9201 });

let clients = {}

server.on('connection', conn => {
    console.log("获取到了新的连接！");
    let client = new PluginDashboard(conn);
    client.register({
        'system': {
            'register': name => {
                console.log("已注册新的连接 ", name);
                clients[name] = client;
                client.register({
                    'system': { 'register': () => null }
                });
                return "ok";
            }
        }
    });
});

export let send = (client, ...data) => clients[client](data);

export let register = (client, obj) => clients[client](obj);

export let receive = (client, obj) => clients[client](obj);