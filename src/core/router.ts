import Route from "./route";
import Block from "./Block";

class Router {
    private static __instance: Router;
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: null | Route=null;
    private readonly _rootQuery: string | undefined;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    public static getRouter(){
        return this.__instance;
    }

    public use(pathname: string, block: typeof Block, modal: typeof Block | null = null) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery}, modal);

        this.routes?.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event => {
            this._onRoute((event?.currentTarget as Window)?.location?.pathname);
        })

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute("/404");
        }

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname: string) {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history?.back();
    }

    public forward() {
        this.history?.forward();
    }

    public currentRoutePathName() {
        return this._currentRoute?this._currentRoute.pathname:null;
    }

    private getRoute(pathname: string) {
        return this.routes?.find(route => route.match(pathname));
    }
}

export default Router;
