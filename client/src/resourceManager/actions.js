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
    accountHistoryQuestionItems: Reflux.createActions([

    ].concat(databaseActions)),

    accountHistoryQuestions: Reflux.createActions([

    ].concat(databaseActions)),

    accountHistoryTestItems: Reflux.createActions([

    ].concat(databaseActions)),

    accountHistoryTests: Reflux.createActions([

    ].concat(databaseActions)),

    accounts: Reflux.createActions([
      'updateAccountByDatabase',
      'login',
      'logout',
      'register',
    ].concat(databaseActions)),

    accountHistorys: Reflux.createActions([

    ].concat(databaseActions)),

    answers: Reflux.createActions([

    ].concat(databaseActions)),

    broadcasts: Reflux.createActions([

    ].concat(databaseActions)),

    classes: Reflux.createActions([
      'addGroup',
      'addMember',
      'removeGroup',
      'removeMember',
      'updateGroup',
      'updateMember',
    ].concat(databaseActions)),

    classMapBlocks: Reflux.createActions([

    ].concat(databaseActions)),

    classMapRows: Reflux.createActions([

    ].concat(databaseActions)),

    classMaps: Reflux.createActions([

    ].concat(databaseActions)),

    classStates: Reflux.createActions([

    ].concat(databaseActions)),

    classTableItems: Reflux.createActions([

    ].concat(databaseActions)),

    classTables: Reflux.createActions([

    ].concat(databaseActions)),

    configs: Reflux.createActions([

    ].concat(databaseActions)),

    dates: Reflux.createActions([

    ].concat(databaseActions)),

    expressionGroups: Reflux.createActions([

    ].concat(databaseActions)),

    expressions: Reflux.createActions([

    ].concat(databaseActions)),

    globalUserGroups: Reflux.createActions([

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
    ].concat(databaseActions)),

    logs: Reflux.createActions([

    ].concat(databaseActions)),

    paths: Reflux.createActions([

    ].concat(databaseActions)),

    pickedHistorys: Reflux.createActions([

    ].concat(databaseActions)),

    providers: Reflux.createActions([

    ].concat(databaseActions)),

    questions: Reflux.createActions([

    ].concat(databaseActions)),

    scoreGroups: Reflux.createActions([

    ].concat(databaseActions)),

    scores: Reflux.createActions([

    ].concat(databaseActions)),

    scoreTypes: Reflux.createActions([

    ].concat(databaseActions)),
    
    tests: Reflux.createActions([

    ].concat(databaseActions)),

    themes: Reflux.createActions([

    ].concat(databaseActions)),

    tradeRules: Reflux.createActions([

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