import {TChat} from "../models/TChat.ts";
import {TUser} from "../models/TUser.ts";
import {SOCKET_CHAT} from "../core/config.ts";
import SocketIO from "../api/socket.ts";
import {TChatMessage} from "../models/TChatMessage.ts";
import {getChats} from "./chats.ts";
import {scrollToEnd} from "../utils/scroll";

export const openConnectMessages = (chat: TChat, currentUser: TUser) => {
    if (!chat.id) return;
    if (!chat.users) return;
    if (!chat.token) return;
    if (chat.connection && chat.connection.getState() === 'OPEN') return;
    if (!currentUser.id) return;

    const socket = new SocketIO(SOCKET_CHAT, currentUser.id, chat.id, chat.token);
    socket.open(() => {
        getAllNewMessage(0, chat);
        setInterval(() => {
            socket.ping();
        }, 15000);
    })

    socket.message(async (event: MessageEvent) => {
        let message: TChatMessage | null = null;
        try {
            message = JSON.parse(event.data);
        } catch (e) {
            console.log("'Unknown message!'")
        }

        if (!message)
            return;

        message.chat_id = chat.id

        if (message.type === 'message' || Array.isArray(message) || message.type === 'file') {
            if (!chat.messages) {
                chat.messages = [];
            }

            if (Array.isArray(message)) {
                message.reverse();
                chat.messages = chat.messages.concat(message);
            } else {
                chat.messages.push(message);
            }

            await getChats({})
            window.store.set({chats: window.store.getState().chats});

            scrollToEnd()
        }

        if (event.data.type === 'user connected') {
            console.log('user connected', event.data)
        }
    })

    chat.connection = socket;
    return chat;
}

export const sendMessage = (message: string) => {
    const currentChatID = window.store.getState().currentChatID;
    const chat = window.store.getState().chats.find((chat) => chat.id == currentChatID )

    const user= window.store.getState().user;
    if (!chat) {
        throw Error('Select Chat!');
    }

    if (chat.connection && chat.connection.getState() === 'OPEN') {
        chat.connection.sendMessage(message);
    } else if (user) {
        openConnectMessages(chat, user)
    }
}

export const getAllNewMessage = (limit: number, chat: TChat | null) => {
    if (!chat) {
        throw Error('Select Chat!');
    }

    if (chat.connection) {
        chat.connection.sendRequestForgetMessage(limit);
        chat.unread_count = 0;
    }
}
