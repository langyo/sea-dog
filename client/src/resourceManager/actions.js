import Reflux from "reflux";

let classes = {};

export default {
    database: {
        accounts: Reflux.createActions([
            'updateAccountByDatabase',
            'login',
            'logout',
            'register'
        ]),
        classes: Reflux.createActions([
            'addGroup',
            'addMember',
            'removeGroup',
            'removeMember',
            'updateGroup',
            'updateMember',

            'updateMembersByDatabase'
        ]),
        groups: Reflux.createActions([
            'addMember',
            'removeMember',
            'updateMember',

            'updateGroupTypeByDatabase',
            'updateGroupByDatabase'
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
            'popupNewMessage',
            'consoleError'
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
        classChoice: Reflux.createActions([

        ]),
        classMap: Reflux.createActions([

        ]),
        classTable: Reflux.createActions([

        ]),
        management: Reflux.createActions([

        ]),
        picker: Reflux.createActions([
            'scoreAddOne',
            'scoreRemoveOne'
        ]),
        randomizer: Reflux.createActions([
            'scoreAddOne',
            'scoreRemoveOne'
        ]),
        practise: Reflux.createActions([

        ]),
        rank: Reflux.createActions([

        ])
    }
}