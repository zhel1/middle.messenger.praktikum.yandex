//TODO remove it
// import Handlebars from 'handlebars';
// import * as Components from '../components';

import * as Pages from '../pages';
import * as Data from "../data";

const pages = {
    'signin': [ Pages.SignInPage, ],
    'signup': [ Pages.SignUpPage,  ],
    'messenger': [ Pages.MessengerPage, { chat_list: Data.ChatListData, conversation: Data.ConversationData, msg_list: Data.MsgListData }],
    '404': [ Pages.Error404Page,  Data.Errors404Data],
    '500': [ Pages.Error500Page, Data.Errors500Data],
    'profile': [ Pages.ProfilePage, {user: Data.UserData} ],
};

export function navigate(page: string) {
    const app = document.getElementById('app');

    //@ts-ignore
    const [Component, context ]= pages[page]
    const component = new Component();
    const htmlElement = component.getContent();
    if (!app?.firstElementChild)
        app?.append(document.createElement('div'));
    if(htmlElement)
        app?.firstElementChild?.replaceWith(htmlElement);

    //TODO remove it
    // const nav = document.getElementById('nav');
    // if (nav) {
    //     nav.innerHTML = (Handlebars.compile(Components.Navigator)(null));
    // }
}
