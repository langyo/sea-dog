import Reflux from "reflux";

let classes = {};

export default {
    database: {
        // 以下部分为单个的全局 Store
        global: {
            currentManager: Reflux.createActions([
                'addGroup',
                'addMember',
                'removeGroup',
                'removeMember',
                'updateGroup',
                'updateMember'
            ])
        },

        // 以下部分为用于创建 Store 的类
        single: {
            aClass: Reflux.createActions([
                'addGroup',
                'addMember',
                'removeGroup',
                'removeMember',
                'updateGroup',
                'updateMember'
            ]),
            group: Reflux.createActions([
                'addMember',
                'removeMember',
                'updateMember'
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