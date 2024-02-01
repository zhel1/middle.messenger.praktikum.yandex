import {HTTPTransport, TResult} from "../core/Http.ts";
import {SignInInput, IUser, SignUpResponse, ApiError} from "../models/IUser.ts";

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
    async signup(data: IUser): Promise<TResult<SignUpResponse | ApiError>> {
        return authApi.post<SignUpResponse>('/signup', {
            headers: {
                "Content-Type": 'application/json'
            },
            data: data
        })
    }

    async signin(data: SignInInput): Promise<TResult<void | ApiError>> {
        return authApi.post<void>('/signin', {
            headers: {
                "Content-Type": 'application/json'
            },
            data: data
        })
    }

    async me(): Promise<TResult<IUser | ApiError>> {
        return authApi.get<IUser>('/user')
    }

    async logout(): Promise<TResult<void | ApiError>> {
        return authApi.post('/logout')
    }
}
