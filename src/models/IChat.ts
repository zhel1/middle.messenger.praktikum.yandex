import {IUser} from "./IUser.ts";
export interface IChat {
    id: number;
    avatar?: string;
    type: string
    title: string;
    unread_msg_count: number;
    last_message: ILastMessage;
}

export interface ILastMessage {
    user: IUser;
    text: string;
    time: string;
}
