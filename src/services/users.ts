import {ChangePasswordInput, TUser} from "../models/TUser.ts";
import {responseHasError} from "../utils/api.utils.ts";
import UserApi from "../api/users.ts";

const userApi = new UserApi();

const updateProfile = async (data: TUser) => {
    const response = await userApi.updateProfile(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: response.data as TUser});
}

const updatePassword = async (data: ChangePasswordInput) => {
    const response = await userApi.updatePassword(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const updateAvatar = async (data: FormData) => {
    const response = await userApi.updateAvatar(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: response.data});
}

const searchUserByLogin = async (login: string) => {
    const response = await userApi.searchUserByLogin(login);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as TUser[]
}

export {
    updateProfile,
    updatePassword,
    updateAvatar,
    searchUserByLogin
}
