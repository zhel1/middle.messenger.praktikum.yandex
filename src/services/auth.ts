import {TUser, SignInInput} from "../models/TUser.ts";
import AuthApi from "../api/auth.ts";
import {responseHasError} from "../utils/api.utils.ts";
import {getChats} from "./chats";
import {RoutesStrs} from "../core/config";
import Router from "../core/router";

const authApi = new AuthApi();

const signup = async (data: TUser) => {
    const response = await authApi.signup(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    await getUser();
}

const signin = async (data: SignInInput) => {
    const response = await authApi.signin(data);
    if (responseHasError(response)) {
        if (response.data.reason === "User already in system") {
            Router.getRouter().go(RoutesStrs.messenger);
        }

        throw Error(response.data.reason)
    }
    await getUser();
    await getChats({});
}

const getUser = async () => {
    const response = await authApi.me();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user:  response.data as TUser});
}

const logout = async () => {
    const response = await authApi.logout();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: null});
}

export {
    signup,
    signin,
    getUser,
    logout
}
