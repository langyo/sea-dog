import classes from "./databaseStore/classes";

import tag from "./viewStore/tag";
import dialog from "./viewStore/dialog";
import popupMenu from "./viewStore/popupMenu";
import popupMessage from "./viewStore/popupMessage";
import theme from "./viewStore/theme";
import fab from "./viewStore/fab";
import language from "./viewStore/language";
import drawer from "./viewStore/drawer";

import broadcastPage from "./pageStore/broadcasts";
import accountPage from "./pageStore/account";
import classTablePage from "./pageStore/classTable";
import managementPage from "./pageStore/management";
import pickerPage from "./pageStore/picker";
import randomizerPage from "./pageStore/randomizer";
import practisePage from "./pageStore/practise";
import rankPage from "./pageStore/rank";

export default {
    database: {
        classes: classes
    },

    view: {
        drawer: drawer,
        tag: tag,
        dialog: dialog,
        popupMenu: popupMenu,
        popupMessage: popupMessage,
        theme: theme,
        fab: fab,
        language: language
    },

    page: {
        broadcast: broadcastPage,
        account: accountPage,
        classTable: classTablePage,
        management: managementPage,
        picker: pickerPage,
        randomizer: randomizerPage,
        practise: practisePage,
        rank: rankPage
    }
}