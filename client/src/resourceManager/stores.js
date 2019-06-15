import accountHistoryQuestionItems from "./databaseStore/accountHistoryQuestionItems";
import accountHistoryQuestions from "./databaseStore/accountHistoryQuestions";
import accountHistoryTestItems from "./databaseStore/accountHistoryTestItems";
import accountHistoryTests from "./databaseStore/accountHistoryTests";
import accounts from "./databaseStore/accounts";
import accountHistorys from "./databaseStore/accountHistorys";
import answers from "./databaseStore/answers";
import broadcasts from "./databaseStore/broadcasts";
import classes from "./databaseStore/classes";
import classMapBlocks from "./databaseStore/classMapBlocks";
import classMapRows from "./databaseStore/classMapRows";
import classMaps from "./databaseStore/classMaps";
import classStates from "./databaseStore/classStates";
import classTableItems from "./databaseStore/classTableItems";
import classTables from "./databaseStore/classTables";
import configs from "./databaseStore/configs";
import dates from "./databaseStore/dates";
import expressionGroups from "./databaseStore/expressionGroups";
import expressions from "./databaseStore/expressions";
import globalUserGroups from "./databaseStore/globalUserGroups";
import groups from "./databaseStore/groups";
import groupTypes from "./databaseStore/groupTypes";
import logs from "./databaseStore/logs";
import paths from "./databaseStore/paths";
import pickedHistorys from "./databaseStore/pickedHistorys";
import providers from "./databaseStore/provides";
import questions from "./databaseStore/questions";
import scoreGroups from "./databaseStore/scoreGroups";
import scores from "./databaseStore/scores";
import scoreTypes from "./databaseStore/scoreTypes";
import tests from "./databaseStore/tests";
import themes from "./databaseStore/themes";
import tradeRules from "./databaseStore/tradeRules";

import tagStore from "./viewStore/tag";
import dialogStore from "./viewStore/dialog";
import popupMenuStore from "./viewStore/popupMenu";
import popupMessageStore from "./viewStore/popupMessage";
import themeStore from "./viewStore/theme";
import fabStore from "./viewStore/fab";
import languageStore from "./viewStore/language";
import drawerStore from "./viewStore/drawer";
import systemStore from "./viewStore/system";

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
        accountHistoryQuestionItems,
        accountHistoryQuestions,
        accountHistoryTestItems,
        accountHistoryTests,
        accountHistorys,
        accounts,
        answers,
        broadcasts,
        classes,
        classMapBlocks,
        classMapRows,
        classMaps,
        classStates,
        classTableItems,
        classTables,
        configs,
        dates,
        expressionGroups,
        expressions,
        globalUserGroups,
        groups,
        groupTypes,
        logs,
        paths,
        pickedHistorys,
        providers,
        questions,
        scoreGroups,
        scores,
        scoreTypes,
        tests,
        themes,
        tradeRules
    },

    view: {
        drawer: drawerStore,
        tag: tagStore,
        dialog: dialogStore,
        popupMenu: popupMenuStore,
        popupMessage: popupMessageStore,
        theme: themeStore,
        fab: fabStore,
        language: languageStore,
        system: systemStore
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