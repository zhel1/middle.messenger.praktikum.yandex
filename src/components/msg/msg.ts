import Block, {IProps} from "../../core/Block";
import {TChatMessage} from "../../models/TChatMessage";
import {RESOURCES_HOST} from "../../core/config";

interface IMsgProps extends IProps {
    message: TChatMessage
}

export class Msg extends Block<IMsgProps> {
    constructor(props: IMsgProps) {
        super(props);
    }

    protected render(): string {
        const { message } = this._props

        let userName = ""
        const chat = window.store.getState().chats.find(chat => chat.id === message.chat_id)
        if (chat && chat.users) {
            const user = chat.users.find(user => {
                return user.id === message.user_id
            })

            if (user && user.id !== window.store.getState().user?.id) {
                userName = user.first_name + ":"
            }
        }

        return (`
            <li class="msg ${ message && message.user_id == window.store.getState().user?.id ? 'my-msg' : ''}">
                ${message.file ? `
                    <article class="msg__file">
                        <b>${userName}</b>
                        <p>${message.content ? message.content : ""}</p>
                        <img src=${RESOURCES_HOST + message.file.path} alt="included_file"/>
                        <div class="msg__time">
                            <span>${new Date(message.time).toLocaleTimeString()}</span>
                        </div>
                    </article>
                `:`
                    <article class="msg__text">
                        <b>${userName}</b>
                        <p>${message.content}</p>
                        <div class="msg__time">
                            <span>${new Date(message.time).toLocaleTimeString()}</span>
                        </div>
                    </article>
                `}
            </li>
        `)
    }
}

