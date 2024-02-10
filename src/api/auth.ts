import {HTTPTransport, TResult} from "../core/Http.ts";
import {SignInInput, TUser, SignUpResponse, ApiError} from "../models/TUser.ts";

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
    async signup(data: TUser): Promise<TResult<SignUpResponse | ApiError>> {
        return authApi.post<SignUpResponse>('/signup', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async signin(data: SignInInput): Promise<TResult<void | ApiError>> {
        return authApi.post<void>('/signin', {
            headers: { "Content-Type": 'application/json'},
            data: data
        })
    }

    async me(): Promise<TResult<TUser | ApiError>> {
        return authApi.get<TUser>('/user')
    }

    async logout(): Promise<TResult<void | ApiError>> {
        return authApi.post('/logout')
    }
}
