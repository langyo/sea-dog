const diff = (from, to) => {
    for (let i of Object.keys(from)) {
        if (to[i] == undefined || typeof from[i] != 'object' && from[i] != to[i]) to[i] = from[i];
        else if (typeof from[i] != 'function' && typeof from[i] != 'object') {
            throw new Error("只允许提供函数！");
        }
        else to[i] = diff(from[i], to[i]);
    }
    return to;
}

export default class PluginDashboard {
    constructor(conn) {
        this.connection = conn;
        this.registerObject = {};
        this.receiveObject = {};
        conn.on('message', this._receiveMessage);

        this.userId = null;
    }

    register = (obj) => {
        this.registerObject = diff(obj, this.registerObject);
    }

    receive = (obj) => {
        this.receiveObject = diff(obj, this.receiveObject);
    }

    send = (...args) => {
        this._sendMessage(args.reduce((prev, next) => {
            if (typeof next == 'string') prev.concat(next.trim().split(' '));
            else if (Array.isArray(next)) prev.concat(next);
            else if (typeof next == 'number' || typeof next == 'bigint') prev.push("" + next);
            else if (typeof next == 'boolean') prev.push(next ? 'true' : 'false');
            else throw new Error("你似乎传入了个既不是具体数据也不是数组的东西……");
            return prev;
        }), ['execute']);
    }

    _sendMessage = (args) => {
        let cmd = args.reduce((prev, next) => prev + ' ' + next);
        let type = args.shift();

        switch (type) {
            case 'execute':
            case 'data':
                this.connection.send(cmd);
                break;
            default:
                console.log("似乎是个错误的指令：", cmd);
                throw new Error("不合法的命令类型！");
        }
    }

    _receiveMessage = (cmd) => {
        console.log(cmd);
        if(cmd[0] == '@') return;
        let args = cmd.trim().split(' ');
        let type = args.shift();

        let func = type == 'execute' ? this.registerObject : this.receiveObject;
        let arg = args.shift();
        let cmds = [arg];

        for (; typeof func[arg] == 'object'; func = func[arg], arg = args.shift(), cmds.push(arg))
            if (func === undefined) throw new Error("不存在这个对象！");

        if (type == 'execute' && func[arg] === undefined) throw new Error("不存在这个对象！");
        // 开始根据解析出的参数列表调用对应的函数
        let ret = func[arg].apply(null, args);
        // 如果对方为 execute，则说明是在请求数据，当 ret 非空时自动给对方一个反馈
        if (type == 'execute' && ret != null) this._sendMessage(['data'].concat(cmds).concat(ret.trim().split(' ')));
    }
}



