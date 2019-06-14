import accounts from "./databaseStore/accounts";
import classes from "./databaseStore/classes";
import groups from "./databaseStore/groups";
import groupTypes from "./databaseStore/groupTypes";

import tag from "./viewStore/tag";
import dialog from "./viewStore/dialog";
import popupMenu from "./viewStore/popupMenu";
import popupMessage from "./viewStore/popupMessage";
import theme from "./viewStore/theme";
import fab from "./viewStore/fab";
import language from "./viewStore/language";
import drawer from "./viewStore/drawer";
import system from "./viewStore/system";

import broadcastPage from "./pageStore/broadcasts";
import accountPage from "./pageStore/account";
import classTablePage from "./pageStore/classTable";
import classManagementPage from "./pageStore/classManagement";
import schoolManagementPage from "./pageStore/schoolManagement";
import pickerPage from "./pageStore/picker";
import randomizerPage from "./pageStore/randomizer";
import practisePage from "./pageStore/practise";
import rankPage from "./pageStore/rank";

export default {
    database: {
        accounts: accounts,
        classes: classes,
        groups: groups,
        groupTypes: groupTypes
    },

    view: {
        drawer: drawer,
        tag: tag,
        dialog: dialog,
        popupMenu: popupMenu,
        popupMessage: popupMessage,
        theme: theme,
        fab: fab,
        language: language,
        system: system
    },

    page: {
        broadcast: broadcastPage,
        account: accountPage,
        classTable: classTablePage,
        classManagement: classManagementPage,
        schoolManagement: schoolManagementPage,
        picker: pickerPage,
        randomizer: randomizerPage,
        practise: practisePage,
        rank: rankPage
    }
}