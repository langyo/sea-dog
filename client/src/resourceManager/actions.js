import Reflux from "reflux";

let classes = {};

export default {
    database: {
        classes: Reflux.createActions([
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
    },

    view: {
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
        popupMenu: Reflux.createActions([
            'toggleTo',
            'reset'
        ]),
        popupMessage: Reflux.createActions([
            'sendNewMessage',
            'popupNewMessage'
        ]),
        theme: Reflux.createActions([
            'togglePrimary',
            'toggleSecondary',
            'toggleMenuTheme'
        ]),
        language: Reflux.createActions([
            'toggleTo',
        ])
    },

    page:{
        account: Reflux.createActions([

        ]),
        classTable: Reflux.createActions([

        ]),
        management: Reflux.createActions([

        ]),
        picker: Reflux.createActions([

        ]),
        practise: Reflux.createActions([

        ]),
        rank: Reflux.createActions([

        ])
    }
}