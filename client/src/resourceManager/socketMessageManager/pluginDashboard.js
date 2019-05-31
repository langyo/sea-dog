const diff = (from, to) => {
    for (let i of Object.keys(from)) {
        if (to[i] == undefined || typeof from[i] != 'object' && from[i] != to[i]) to[i] = from[i];
        else if (typeof from[i] != 'function') throw new Error("只允许提供函数！");
        else to[i] = diff(from[i], to[i]);
    }
    return to;
}

export class PluginDashboard {
    constructor(conn) {
        this.connection = conn;
        this.registerObject = {};
        this.receiveObject = {};
        conn.onmessagg = (data) => this._receiveMessage(data.data);

        this.userId = null;
    }

    register(obj) {
        PluginDashboard.registerObject = diff(obj, PluginDashboard.registerObject);
    }

    receive(obj) {
        PluginDashboard.receiveObject = diff(obj, PluginDashboard.receiveObject);
    }

    _sendMessage(...args) {
        console.log("Socket Manager 即将发送", args);
        let cmd = args.reduce((prev, next) => prev + ' ' + next);
        let type = args.shift();

        switch(type) {
            case 'execute':
            case 'data':
                this.connection.send(cmd);
                break;
            default:
                throw new Error("不合法的命令类型！");
        }
    }

    _receiveMessage(cmd) {
        let args = cmd.trim().split(' ');
        let type = args.shift();
    
        let func = type == 'execute' ? PluginDashboard.register : PluginDashboard.receive;
        let arg = args.shift();
    
        for (; typeof func[arg] == 'object'; console.log(typeof func[arg]), func = func[arg], arg = args.shift())
            if(func === undefined) throw new Error("不存在这个对象！");
    
        if(func[arg] === undefined) throw new Error("不存在这个对象！");
        func[arg].apply(null, args);
    }
}

    

