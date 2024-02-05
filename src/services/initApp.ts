import {getUser} from "./auth";
import {RoutesStrs} from "../core/config";
import Router from "../core/router";
import {IUser} from "../models/IUser";

const initApp = async () => {
    let me: IUser;
    try {
        me = await getUser();
    } catch (error) {
        Router.getRouter().go(RoutesStrs.signin)
        return;
    }

    // const chats = await getChats();
     window.store.set({user: me});
    // navigate('emails')
}

// const initChatPage = async () => {
//     const chats = await getChats();
//     window.store.set({chats});
// }

export {
    initApp,
    // initChatPage
}