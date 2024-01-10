import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import { navigate } from './core/navigate';
//  import * as Pages from './pages';
//  import * as Data from "./data";

// const pages = {
//     'signin': [ Pages.SignInPage, ],
//     'signup': [ Pages.SignUpPage,  ],
//     'messenger': [ Pages.MessengerPage, { chat_list: Data.ChatListData, conversation: Data.ConversationData, msg_list: Data.MsgListData }],
//     '404': [ Pages.ErrorPage,  Data.Errors404Data],
//     '500': [ Pages.ErrorPage, Data.Errors500Data],
//     'profile': [ Pages.ProfilePage, {user: Data.UserData} ],
//     'profile-edit': [ Pages.ProfileEditPage, {user: Data.UserData,} ],
// };

// Object.entries(Components).forEach(([ name, component ]) => {
//     //@ts-ignore
//     Handlebars.registerPartial(name, component);
// });

registerComponent('Button', Components.Button);
registerComponent('InputAuth', Components.InputAuth);
registerComponent('FormAuth', Components.FormAuth);
registerComponent('Logo', Components.Logo);

document.addEventListener('DOMContentLoaded', () => navigate('signin'));

// document.addEventListener('click', e => {
//     //@ts-ignore
//     const page = e.target.getAttribute('page');
//     if (page) {
//         navigate(page);
//
//         e.preventDefault();
//         e.stopImmediatePropagation();
//     }
// });

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
