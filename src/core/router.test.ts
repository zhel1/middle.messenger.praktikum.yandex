import {assert, expect} from "chai";
import sinon from 'sinon';
import Router from "./router";
import {SignInPage, SignUpPage} from "../pages";
import Block from "./Block";

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router(".app");
    });

    const setRouters = () => {
        if (router) {
            router.use('/login', SignInPage as typeof Block)
                  .use('/sign-up', SignUpPage as typeof Block)
        }
    }

    describe('Object should create correct', () => {
        it('It should not be null', () => {
            expect(router).not.null;
        });

        it('Current router should be null', () => {
            expect(router.currentRoute).null;
        });

        it('Current path of route should be null', () => {
            expect(router.currentRoutePathName()).null;
        });
    });

    it('Object should get only one instance', () => {
        const router1 = new Router(".app1");
        assert.equal(router1, router);
    });

    describe('Router Methods', () => {
        it('getRoute should return null on not added path', () => {
            assert.equal(router.getRoute('/login'), null);
        });

        it('Method use should return router for Method Chaining ', () => {
            assert.equal(router.use('/login', SignInPage as typeof Block), router);
        });

        it('getRoute should return not null on added path', () => {
            setRouters();
            expect(router.getRoute('/login')).not.null;
        });

        it('start added event onpopstate', () => {
            assert.equal(window.onpopstate, null);
            router.start();
            expect(window.onpopstate).not.null;
        });

        describe('Navigate Methods', () => {
            beforeEach(() => {
                setRouters();
            });

            it('go works correct', () => {
                const pushState = sinon.spy(window.history, "pushState");
                assert.equal(window.location.pathname, '/');
                router.go('/login');
                assert.equal(window.location.pathname, '/login');
                assert(pushState.calledOnce);
            });

            it('back works correct', () => {
                const back = sinon.spy(window.history, "back");
                router.go('/login');
                router.go('/signup');
                router.back();
                assert(back.calledOnce);
            });

            it('forward works correct', () => {
                const forward = sinon.spy(window.history, "forward");
                router.forward();
                assert(forward.calledOnce);
            });
        });
    });
});
