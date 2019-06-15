import Reflux from "reflux";

const databaseActions = [
  '_count',
  '_list',
  '_get',

  '_arrayCount',
  '_arrayList'
];

export default {
  database: {
    accounts: Reflux.createActions([
      'updateAccountByDatabase',
      'login',
      'logout',
      'register',
    ].concat(databaseActions)),
    classes: Reflux.createActions([
      'addGroup',
      'addMember',
      'removeGroup',
      'removeMember',
      'updateGroup',
      'updateMember',
    ].concat(databaseActions)),
    groups: Reflux.createActions([
      'addMember',
      'removeMember',
      'updateMember',
    ].concat(databaseActions)),
    groupTypes: Reflux.createActions([
      'addGroup',
      'removeGroup',
      'updateGroup'
    ].concat(databaseActions))
  },

  view: {
    drawer: Reflux.createActions([
      'toggleTo',
      'reset',
      'toggleDrawerOpen'
    ]),
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
      'toggleMenuTheme',
      'handleResize'
    ]),
    language: Reflux.createActions([
      'toggleTo',
    ]),
    system: Reflux.createActions([
      'toggleDatabaseState',
      'toggleNetworkState',
      'log',
      'error'
    ])
  },

  page: {
    broadcast: Reflux.createActions([
      'update'
    ]),
    account: Reflux.createActions([

    ]),
    classChoice: Reflux.createActions([

    ]),
    classMap: Reflux.createActions([

    ]),
    classTable: Reflux.createActions([

    ]),
    classManagement: Reflux.createActions([
      'appendNewMember'
    ]),
    schoolManagement: Reflux.createActions([

    ]),
    picker: Reflux.createActions([
      'scoreAddOne',
      'scoreRemoveOne',
      'openRandomPicker',
      'closeRandomPicker'
    ]),
    randomizer: Reflux.createActions([
      'scoreAddOne',
      'scoreRemoveOne',
      'handleChangeGenerateCountNumber',
      'handlePushGenerateCountNumber',
      'handlePopGenerateCountNumber'
    ]),
    practise: Reflux.createActions([

    ]),
    rank: Reflux.createActions([

    ])
  }
}