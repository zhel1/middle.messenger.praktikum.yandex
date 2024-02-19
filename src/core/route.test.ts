import Route from "./route";
import {SignInPage} from "../pages";
import {assert} from "chai";
import Block from "./Block";

describe('Route', () => {
    it('Object should create correct', () => {
        const route = new Route('/login', SignInPage as typeof Block, {}, null);
        assert.equal(route.pathname, '/login');
    });

    describe('Route Methods', () => {
        let route: Route;
        beforeEach(() => {
            route = new Route('/login', SignInPage as typeof Block, {}, null);
        })

        it('match should return true for pathname', () => {
            assert.equal(route.match('/login'),true);
        });

        it('match should return false for another pathname', () => {
            assert.equal(route.match('/signup'),false);
        });

        it('navigate should work correct', () => {
            route.navigate('/login');
        });

        it('leave should work correct', () => {
            route.leave();
        });
    });
});
