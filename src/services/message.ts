import {IChat} from "../models/IChat.ts";
import {IUser} from "../models/IUser.ts";
import {SOCKET_CHAT} from "../core/config.ts";
import SocketIO from "../api/socket.ts";

export const openConnectMessages = (chat: IChat, currentUser: IUser) => {
    if (!chat.id) return;
    if (!chat.users) return;
    if (!chat.token) return;
    if (chat.users.length < 2) return chat;
    if (chat.connection && chat.connection.getState() === 'OPEN') return;
    if (!currentUser.id) return;

    const socket = new SocketIO(SOCKET_CHAT, currentUser.id, chat.id, chat.token);
    socket.open(() => {
        getAllNewMessage(0, chat);
        setInterval(() => {
            socket.ping();
        }, 15000);

    })

    socket.message((event: MessageEvent) => {
        console.log("new message")
        let message = null;
        try {
            message = JSON.parse(event.data);
        } catch (e) {
            console.log("'Unknown message!'")
        }

        if (!message)
            return;

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

            // if (chat.id === window.store.getState().currentChatID) {
            //     window.store.set({currentChatID: chat.id});
            // } else {
            //     const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id);
            //     if (foundedChat) {
            //         foundedChat.unread_count += 1;
            //         window.store.set({chats: window.store.getState().chats});
            //     }
            // }

            window.store.getState().chats?.map((storedChat) => storedChat.id === chat.id ? chat : storedChat)
            window.store.set({chats: window.store.getState().chats});

            // const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id);
            // if (foundedChat) {
            //     foundedChat.unread_count += 1;
            //     window.store.set({chats: window.store.getState().chats});
            // }

            const element = document.querySelector('.scroll-bottom');
            if (element)
                element.scrollIntoView({
                    behavior: 'auto',
                    block: 'end',
                });
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

export const getAllNewMessage = (limit: number, chat: IChat | null) => {
    if (!chat) {
        throw Error('Select Chat!');
    }

    if (chat.connection) {
        chat.connection.sendRequestForgetMessage(limit);
        chat.unread_count = 0;
    }
}
