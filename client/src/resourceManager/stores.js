import mainPage from "./databaseStore/mainPage";

import post from "./databaseStore/posts";

import tag from "./viewStore/tag";
import dialog from "./viewStore/dialog";
import popupMessage from "./viewStore/popupMessage";
import theme from "./viewStore/theme";
import fab from "./viewStore/fab";
import language from "./viewStore/language";

export default {
    database: {
        // 以下部分为单个的全局 Store
        global: {
            mainPage: mainPage,
        },

        // 以下部分为用于创建 Store 的类
        single: {
            post: post,
        }
    },

    view: {
        global: {
            tag: tag,
            dialog: dialog,
            popupMessage: popupMessage,
            theme: theme,
            fab: fab,
            language: language
        }
    }
}