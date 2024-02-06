import ChatsApi from "../api/chats";
import {IChat, IGetChatInput} from "../models/IChat";
import {responseHasError} from "../utils/api.utils";

const chatsApi = new ChatsApi()

const getChats = async (data: IGetChatInput) => {
    const response = await chatsApi.getChats(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as IChat[]
}


/*
*    async getChats(data: IGetChatInput): Promise<TResult<IChat[] | ApiError>> {
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
* */

export {
    getChats
}
