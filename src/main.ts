import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import { navigate } from './core/navigate';

Handlebars.registerPartial('FormAuth', Components.FormAuth);
Handlebars.registerPartial('FormProfile', Components.FormProfile);

registerComponent('Button', Components.Button);
registerComponent('Input', Components.Input);
registerComponent('InputAuth', Components.InputAuth);
registerComponent('InputConf', Components.InputConf);
registerComponent('Logo', Components.Logo);
registerComponent('Error', Components.Error);
registerComponent('ChatList', Components.ChatList);
registerComponent('ChatItem', Components.ChatItem);
registerComponent('Avatar', Components.Avatar);
registerComponent('InputMsg', Components.InputMsg);
registerComponent('Conversation', Components.Conversation);
registerComponent('MsgList', Components.MsgList);
registerComponent('SideBar', Components.SideBar);
registerComponent('Msg', Components.Msg);
registerComponent('Navigator', Components.Navigator);

document.addEventListener('DOMContentLoaded', () => navigate('messenger'));

document.addEventListener('click', e => {
    if (!e) return;
    if(!e.target)return;

    const page = (e.target as HTMLElement).getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

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
