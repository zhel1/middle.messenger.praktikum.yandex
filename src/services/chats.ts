import ChatsApi from "../api/chats";
import {CreateChatResponse, IChat, IGetChatInput, TAddDeleteUserInput} from "../models/IChat";
import {responseHasError} from "../utils/api.utils";
import {IUser} from "../models/IUser";
import {Indexed, merge} from "../utils/merge.ts";
import {openConnectMessages} from "./message.ts";

const chatsApi = new ChatsApi()

const getChats = async (data: IGetChatInput) => {
    const response = await chatsApi.getChats(data)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    const oldChats = window.store.getState().chats
    const newChats= response.data as IChat[]

    const connectedChats = await Promise.all(newChats.map(async (newChat) => {
        const oldChat = oldChats.find((oldChat) => newChat.id === oldChat.id)
        if (oldChat) { //if old chat with the same id exists
            oldChat.users = await getChatUsers(oldChat.id)
            //todo update messages
            return merge(oldChat as object as Indexed, newChat as object as Indexed) as object as IChat
        } else { //if new chat was created
            const me = window.store.getState().user
            newChat.token = await getChatToken(newChat.id)
            newChat.users = await getChatUsers(newChat.id)
            //todo update messages
            if (me) {
                const newConnectedChat = openConnectMessages(newChat, me)
                return newConnectedChat ? newConnectedChat : newChat
            } else {
                return newChat
            }
        }
    }))

    window.store.set({chats: connectedChats });
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

    await getChats({});

}

const getChatUsers = async (chatID: number) => {
    const response = await chatsApi.getChatUsers(chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data as IUser[]
}

const updateChatAvatar = async (file: FormData, chatID: number) => {
    const response = await chatsApi.updateChatAvatar(file, chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    await getChats({});

    return response.data as IUser[]
}

const getChatToken = async (chatID: number) => {
    const response = await chatsApi.getChatToken(chatID)
    if (responseHasError(response)) {
        throw Error(response.data.reason)
    }

    return response.data.token
}

export {
    getChats,
    createChat,
    deleteChat,
    addUserToChat,
    deleteUsersFromChat,
    getChatUsers,
    updateChatAvatar,
    getChatToken,
}
