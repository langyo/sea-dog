﻿import classes from "./databaseStore/classes";

import tag from "./viewStore/tag";
import dialog from "./viewStore/dialog";
import popupMenu from "./viewStore/popupMenu";
import popupMessage from "./viewStore/popupMessage";
import theme from "./viewStore/theme";
import fab from "./viewStore/fab";
import language from "./viewStore/language";

import accountPage from "./pageStore/account";
import classTablePage from "./pageStore/classTable";
import managementPage from "./pageStore/management";
import pickerPage from "./pageStore/picker";
import practisePage from "./pageStore/practise";
import rankPage from "./pageStore/rank";

export default {
    database: {
        classes: classes
    },

    view: {
        tag: tag,
        dialog: dialog,
        popupMenu: popupMenu,
        popupMessage: popupMessage,
        theme: theme,
        fab: fab,
        language: language
    },

    page: {
        account: accountPage,
        classTable: classTablePage,
        management: managementPage,
        picker: pickerPage,
        practise: practisePage,
        rank: rankPage
    }
}