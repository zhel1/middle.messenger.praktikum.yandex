import {IUser} from "./IUser.ts";
import SocketIO from "../api/socket.ts";
import {IChatMessage} from "./IChatMessage.ts";

export interface IChat {
    id: number;
    title: string;
    avatar?: string;
    type: string
    unread_count: number;
    created_by: number;
    last_message: ILastMessage;

    token?: string;
    users?: IUser[];
    connection?: SocketIO | null;
    messages?: IChatMessage[] | null;
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

export type GetTokenResponse = {
    token: string
}


export type TAddDeleteUserInput = {
    users: number[]
    chatId: number
}

