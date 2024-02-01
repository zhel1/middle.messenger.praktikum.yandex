import {IChat} from "./IChat.ts";
import {IUser} from "./IUser.ts";

export type IAppState = {
    error: string | null,
    user?: IUser | null,
    chats: IChat[]|null,
    currentChat: IChat|null,
}