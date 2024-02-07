import {IUser} from "./IUser.ts";

export interface IChat {
    id: number;
    title: string;
    avatar?: string;
    type: string
    unread_count: number;
    created_by: number;
    last_message: ILastMessage;
}

export type ILastMessage = {
    user: IUser
    time: string
    content: string
}

export type IGetChatInput = {
    offset?: number
    limit?: number
    title?: string
}

export type CreateChatResponse = {
    id: number
}

export type TAddDeleteUserInput = {
    users: number[]
    chatId: number
}

