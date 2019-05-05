import Reflux from "reflux";

let singleList = {
    database: {
        single: {
            post: {},
        }
    }
};

const checkSingleStore = (id, path, actions) => {
    if(path[id] === undefined) path[id] = Reflux.createActions(actions);
    return path[id];
};

export default {
    database: {
        // 以下部分为单个的全局 Store
        global: {
            mainPage: Reflux.createActions([
                'update'
            ])
        },

        // 以下部分为用于创建 Store 的类
        single: {
            post: (id) => checkSingleStore(id, singleList.database.single.post,[
                'updatePost'
            ])
        }
    },

    view: {
        global: {
            tag: Reflux.createActions([
                'create',
                'delete',
                'toggleTo'
            ]),
            dialog: Reflux.createActions([
                'toggleTo',
                'reset'
            ]),
            fab: Reflux.createActions([
                'toggleTo',
                'reset'
            ]),
            popupMessage: Reflux.createActions([
                'sendNewMessage',
                'popupNewMessage'
            ]),
            theme: Reflux.createActions([
                'togglePrimary',
                'toggleSecondary'
            ]),
            language: Reflux.createActions([
                'toggleTo',
            ])
        }
    }
}