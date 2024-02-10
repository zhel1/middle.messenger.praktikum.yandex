import {TUser} from "./TUser.ts";
import SocketIO from "../api/socket.ts";
import {TChatMessage} from "./TChatMessage.ts";

export interface TChat {
    id: number;
    title: string;
    avatar?: string;
    type: string
    unread_count: number;
    created_by: number;
    last_message: TLastMessage;

    token?: string;
    users?: TUser[];
    connection?: SocketIO | null;
    messages?: TChatMessage[] | null;
}

export type TLastMessage = {
    user: TUser
    time: string
    content: string
}

export type TGetChatInput = {
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

