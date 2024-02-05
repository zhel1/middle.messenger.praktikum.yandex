import {HTTPTransport, TResult} from "../core/Http.ts";
import {ApiError, ChangePasswordInput, IUser} from "../models/IUser.ts";


const userApi = new HTTPTransport('/user');

export default class UserApi {
    async updateProfile(data: IUser): Promise<TResult<IUser | ApiError>> {
        return userApi.put<IUser>('/profile', {
            headers: {
                "Content-Type": 'application/json'
            },
            data: data
        })
    }

    async updatePassword(data: ChangePasswordInput) {
        return userApi.put<void>('/password', {
            headers: {
                "Content-Type": 'application/json'
            },
            data: data
        })
    }

    async updateAvatar(file: FormData) {
        return userApi.put<IUser>('/profile/avatar', {
            data: file
        })
    }

    async getUserByID(id: number) {
        return userApi.get<IUser>(`/${id}`)
    }

    async searchUserByLogin(login: string) {
        return userApi.post<IUser[]>('/search', {
            headers: {
                "Content-Type": 'application/json'
            },
            data: { login }
        })
    }
}
