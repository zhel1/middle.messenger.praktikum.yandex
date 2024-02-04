import {IUser, SignInInput} from "../models/IUser.ts";
import AuthApi from "../api/auth.ts";
import {responseHasError} from "../utils/api.utils.ts";

const authApi = new AuthApi();

const signup = async (data: IUser) => {
    const response = await authApi.signup(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    const me = await getUser();
    window.store.set({user: me});
}

const signin = async (data: SignInInput) => {
    const response = await authApi.signin(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
    const me = await getUser();
    window.store.set({user: me});
}

const getUser = async () => {
    const response = await authApi.me();
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as IUser
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
