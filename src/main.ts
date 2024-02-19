import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import Router from "./core/router";
import * as Pages from "./pages";
import Block from "./core/Block";
import {RoutesStrs} from "./core/config.ts";
import {TAppState} from "./models/TAppState.ts";
import {Store} from "./core/Store.ts";
import {initApp} from "./services/initApp";
import ModalManager from "./core/dialog-menedger";

//helpers
Handlebars.registerHelper('firstLetter', function (aString) {
    return aString[0]
})

Handlebars.registerHelper('colorByStr', function (str) {
    const colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e",
        "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
        "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12",
        "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
    return colours[str.charAt(0).toUpperCase().charCodeAt(0) % colours.length]
})

Handlebars.registerHelper('concat', function(...args) {
    let outStr = '';
    for(const arg in args){
        if(typeof args[arg]!='object'){
            outStr += args[arg];
        }
    }
    return outStr;
});

Handlebars.registerPartial('FormAuth', Components.FormAuth);
Handlebars.registerPartial('FormProfile', Components.FormProfile);

Object.entries(Components).forEach(
    ([componentName, component]) => registerComponent(componentName, component as typeof Block)
)

declare global {
    interface Window {
        store: Store<TAppState>;
    }

    type Nullable<T> = T | null;
}

const initState: TAppState = {
    error: null,
    user: null,
    currentChatID: null,
    chats: [],
}

window.store = new Store<TAppState>(initState);

new Router(".app")
    .use(RoutesStrs['signin'], Pages.SignInPage as typeof Block)
    .use(RoutesStrs['signup'], Pages.SignUpPage as typeof Block)
    .use(RoutesStrs['messenger'], Pages.MessengerPage as typeof Block)
    .use(RoutesStrs['settings'], Pages.MessengerPage as typeof Block, Components.ProfileWgt as typeof Block)
    .use(RoutesStrs['404'], Pages.Error404Page as typeof Block)
    .start();

new ModalManager()

initApp()
