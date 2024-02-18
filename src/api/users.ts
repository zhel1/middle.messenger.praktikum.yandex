import {HTTPTransport, TResult} from "../core/Http.ts";
import {ApiError, ChangePasswordInput, TUser} from "../models/TUser.ts";


const userApi = new HTTPTransport('/user');

export default class UserApi {
    async updateProfile(data: TUser): Promise<TResult<TUser | ApiError>> {
        return userApi.put<TUser>('/profile', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async updatePassword(data: ChangePasswordInput) {
        return userApi.put<void>('/password', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async updateAvatar(file: FormData) {
        return userApi.put<TUser>('/profile/avatar', {
            data: file
        })
    }

    async getUserByID(id: number) {
        return userApi.get<TUser>(`/${id}`)
    }

    async searchUserByLogin(login: string) {
        return userApi.post<TUser[]>('/search', {
            headers: { "Content-Type": 'application/json'},
            data: { login }
        })
    }
}
