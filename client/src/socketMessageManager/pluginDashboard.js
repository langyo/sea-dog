const diff = (from, to) => {
    for (let i of Object.keys(from)) {
        if (to[i] == undefined || typeof from[i] != 'object' && from[i] != to[i]) to[i] = from[i];
        else if (typeof from[i] != 'function') throw new Error("只允许提供函数！");
        else to[i] = diff(from[i], to[i]);
    }
    return to;
}

export let PluginDashboard = {
    register: function (obj) {
        PluginDashboard.register = diff(obj, PluginDashboard.register);
    },
    receive: function (obj) {
        PluginDashboard.receive = diff(obj, PluginDashboard.receive);
    }
}

// TEST
// let clipboard = "";
// PluginDashboard.register({
//     'execute': () => console.log("execute"),
//     'clipboard': {
//         'set': (obj) => clipboard = obj,
//         'get': () => console.log(clipboard)
//     }
// });
// PluginDashboard.register({
//     'data': () => console.log('data'),
//     'execute': () => console.log("execute2")
// });

export let getMessage = cmd => {
    let args = cmd.trim().split(' ');
    let type = args.shift();

    let func = type == 'execute' ? PluginDashboard.register : PluginDashboard.receive;
    let arg = args.shift();

    for (; typeof func[arg] == 'object'; console.log(typeof func[arg]), func = func[arg], arg = args.shift())
        if(func === undefined) throw new Error("不存在这个对象！");

    if(func[arg] === undefined) throw new Error("不存在这个对象！");
    func[arg].apply(null, args);
}