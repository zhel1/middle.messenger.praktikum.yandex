import {HTTPTransport, TResult} from "../core/Http.ts";
import {ApiError, TUser} from "../models/TUser.ts";
import {CreateChatResponse, GetTokenResponse, TChat, TGetChatInput, TAddDeleteUserInput} from "../models/TChat.ts";

const chatsApi = new HTTPTransport('/chats');

export default class ChatsApi {
    async getChats(data: TGetChatInput): Promise<TResult<TChat[] | ApiError>> {
        return chatsApi.get<TChat[]>('', {
            data: data
        })
    }

    async createChat(title: string): Promise<TResult<CreateChatResponse | ApiError>> {
        return chatsApi.post<CreateChatResponse>('', {
            headers: { "Content-Type": 'application/json' },
            data: { title: title }
        });
    }

    async deleteChat(id: number): Promise<TResult<object | ApiError>> {
        return chatsApi.delete('', {
            headers: { "Content-Type": 'application/json'},
            data: { chatId: id }}
        );
    }

    async addUsersToChat(data: TAddDeleteUserInput) {
        return chatsApi.put('/users', {
            headers: { "Content-Type": 'application/json'},
            data: data
        });
    }

    async deleteUsersFromChat(data: TAddDeleteUserInput) {
        return chatsApi.delete('/users', {
            headers: { "Content-Type": 'application/json'},
            data: data
        });
    }

    async getChatUsers(id: number) {
        return chatsApi.get<TUser[]>(`/${id}/users`);
    }

    async getChatToken(id: number) {
        return chatsApi.post<GetTokenResponse>(`/token/${id}`);
    }

    async updateChatAvatar(file: FormData, chatId: number) {
        file.append('chatId', String(chatId));
        return chatsApi.put('/avatar', { data: file });
    }
}
