import {HTTPTransport, TResult} from "../core/Http.ts";
import {ApiError} from "../models/IUser.ts";
import {IChat, IGetChatInput, TAddDeleteUserInput} from "../models/IChat.ts";

const chatsApi = new HTTPTransport('/chats');

export default class ChatsApi {
    async getChats(data: IGetChatInput): Promise<TResult<IChat[] | ApiError>> {
        return chatsApi.get<IChat[]>('', {
            data: data
        })
    }

    async createChat(title: string) {
        return chatsApi.post('', {
            headers: { "Content-Type": 'application/json' },
            data: { title: title }
        });
    }

    async deleteChat(id: number) {
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

    async getChatUsers(id: string) {
        return chatsApi.get(`/${id}/users`);
    }

    async getChatToken(id: string) {
        return chatsApi.post(`/token/${id}`);
    }

    async updateChatAvatar(file: FormData, chatId: number) {
        file.append('chatId', String(chatId));
        return chatsApi.put('/avatar', { data: file });
    }
}
