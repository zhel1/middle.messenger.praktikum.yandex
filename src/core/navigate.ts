import * as Pages from '../pages';
//TODO remove it
import * as Components from '../components';

const pages = {
    'signin': Pages.SignInPage,
    'signup': Pages.SignUpPage,
    'messenger': Pages.MessengerPage,
    '404': Pages.Error404Page,
    '500': Pages.Error500Page,
    'profile': Pages.ProfilePage,
};

export function navigate(page: string) {
    const app = document.getElementById('app');

    //@ts-expect-error Temp decision while we don't have router
    const Component = pages[page]
    const component = new Component();
    const htmlElement = component.getContent();
    if (!app?.firstElementChild)
        app?.append(document.createElement('div'));
    if(htmlElement)
        app?.firstElementChild?.replaceWith(htmlElement);

    //TODO remove it
    const nav = document.getElementById('nav');
    const navHtmlElement = (new Components.Navigator()).getContent();
    if (!nav?.firstElementChild)
        nav?.append(document.createElement('div'));
    if(navHtmlElement)
        nav?.firstElementChild?.replaceWith(navHtmlElement);
}
