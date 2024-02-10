import {getUser} from "./auth";
import {RoutesStrs} from "../core/config";
import Router from "../core/router";
import {getChats} from "./chats";

const initApp = async () => {
    try {
        await getUser();
    } catch (error) {
        Router.getRouter().go(RoutesStrs.signin)
        return;
    }

    await getChats({});
}

export {
    initApp,
}
