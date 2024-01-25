import * as Pages from '../pages';
import Block from "./Block.ts";
//TODO remove it
import * as Components from '../components';

const pages: {[key: string]: typeof Block } = {
    'signin': Pages.SignInPage,
    'signup': Pages.SignUpPage,
    'messenger': Pages.MessengerPage,
    '404': Pages.Error404Page,
    '500': Pages.Error500Page,
    'profile': Pages.ProfilePage,
};

export function navigate(page: string) {
    const app = document.getElementById('app');
    if (!app?.firstElementChild) {
        app?.append(document.createElement('div'));
    }

    const Component = pages[page] as unknown as typeof Block
    const htmlElement =  new Component().getContent();
    if (htmlElement) {
        app?.firstElementChild?.replaceWith(htmlElement);
    }

    //TODO remove it
    const nav = document.getElementById('nav');
    const navHtmlElement = (new Components.Navigator()).getContent();
    if (!nav?.firstElementChild)
        nav?.append(document.createElement('div'));
    if(navHtmlElement)
        nav?.firstElementChild?.replaceWith(navHtmlElement);
}
