import {TChat} from "./TChat.ts";
import {TUser} from "./TUser.ts";

export type TAppState = {
    error: string | null,
    user: TUser | null,
    chats: TChat[],
    currentChatID: number | null,
}
