let PluginDashboard = {
    register: function(obj) {
        const dfs = (left, right) => {
            for(let i of Object.keys(left)){
                if(right[i] == undefined) right[i] = left[i];
                else if(typeof left[i] != 'Object' && left[i] != right[i]) right[i] = left[i];
                else right[i] = dfs(left[i], right[i]);
            }
            return right;
        }
        dfs(obj, PluginDashboard.register);
    },
    receive: function(obj) {
        const dfs = (left, right) => {
            for(let i of Object.keys(left)){
                if(right[i] == undefined) right[i] = left[i];
                else if(typeof left[i] != 'Object' && left[i] != right[i]) right[i] = left[i];
                else right[i] = dfs(left[i], right[i]);
            }
            return right;
        }
        dfs(obj, PluginDashboard.receive);
    }
}

// TEST
let clipboard = "";
PluginDashboard.register({
    'execute': () => console.log("execute"),
    'clipboard': {
        'set': (obj) => clipboard = obj,
        'get': () => console.log(clipboard)
    }
});
PluginDashboard.receive({
    'data': () => console.log('data')
});

let getMessage = cmd => {
    let args = cmd.trim().split(' ');
    let type = args.shift();
    console.log("收到指令 " + type + " ，参数：", args);

    let cmds = args, pos = 0;
    let func = type == 'execute' ? PluginDashboard.register : PluginDashboard.receive;
    try{
        for(; cmds.length > 0; func = func[args.shift()], ++pos, console.log("遍历到：", func));
    }catch(e){
        console.log("最终结果：", func);
        func(args.slice(pos));
        return;
    }
    console.log("最终结果：", func);
    func(args.slice(pos));
}