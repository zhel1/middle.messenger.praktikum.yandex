import {ChangePasswordInput, IUser} from "../models/IUser.ts";
import {responseHasError} from "../utils/api.utils.ts";
import UserApi from "../api/users.ts";

const userApi = new UserApi();

const updateProfile = async (data: IUser) => {
    const response = await userApi.updateProfile(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: response.data as IUser});
}

const updatePassword = async (data: ChangePasswordInput) => {
    const response = await userApi.updatePassword(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    //store -> close widget
}

const updateAvatar = async (data: FormData) => {
    const response = await userApi.updateAvatar(data);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    window.store.set({user: response.data});
    //store -> close widget
}

const searchUserByLogin = async (login: string) => {
    const response = await userApi.searchUserByLogin(login);
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as IUser[]
}

export {
    updateProfile,
    updatePassword,
    updateAvatar,
    searchUserByLogin
}
