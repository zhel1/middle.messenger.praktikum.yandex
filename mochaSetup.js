import {JSDOM} from 'jsdom';
import Handlebars from "handlebars";
import * as Components from "./src/components/index.js";
import {registerComponent} from "./src/core/registerComponent.js";

Handlebars.registerPartial('FormAuth', Components.FormAuth);
Handlebars.registerPartial('FormProfile', Components.FormProfile);

Object.entries(Components).forEach(
    ([componentName, component]) => registerComponent(componentName, component)
)

// jsdom
const jsdom = new JSDOM(`<body><div id="app"></div></body>`, {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000,
});

/* eslint-disable */
global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
/* eslint-enable */

