import ChatsApi from "../api/chats";
import {CreateChatResponse, IChat, IGetChatInput, TAddDeleteUserInput} from "../models/IChat";
import {responseHasError} from "../utils/api.utils";
import {IUser} from "../models/IUser";

const chatsApi = new ChatsApi()

const getChats = async (data: IGetChatInput) => {
    const response = await chatsApi.getChats(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as IChat[]
}

const createChat = async (title: string) => {
    const response = await chatsApi.createChat(title)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as CreateChatResponse
}

const deleteChat = async (id: number) => {
    const response = await chatsApi.deleteChat(id)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const addUserToChat = async (data: TAddDeleteUserInput) => {
    const response = await chatsApi.addUsersToChat(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const deleteUsersFromChat = async (data: TAddDeleteUserInput) => {
    const response = await chatsApi.deleteUsersFromChat(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }
}

const getChatUsers = async (chatID: number) => {
    const response = await chatsApi.getChatUsers(chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as IUser[]
}

export {
    getChats,
    createChat,
    deleteChat,
    addUserToChat,
    deleteUsersFromChat,
    getChatUsers
}
