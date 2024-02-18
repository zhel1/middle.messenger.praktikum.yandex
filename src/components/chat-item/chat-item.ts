import Block, {IProps} from "../../core/Block";
import {TChat} from "../../models/TChat.ts";

interface IChatItemProps extends IProps {
    chat: TChat
    onClick: (chatID: number) => void
}

export class ChatItem extends Block<IChatItemProps> {
    constructor(props: IChatItemProps) {
        super({
            ...props,
            events: {
                click: ((event) => {
                    event.preventDefault();
                    if (props.onClick) {
                        props.onClick(props.chat.id)
                    }
                })
            }
        });
    }

    protected render(): string {
        const { chat } = this._props

        const isSelected = window.store.getState().currentChatID === this._props.chat.id

        let lastUserName = ""
        if (chat.last_message) {
            if (chat.last_message.user.login === window.store.getState().user?.login) {
                lastUserName = "You: "
            } else {
                lastUserName = chat.last_message.user.first_name + ": "
            }
        }

        return (`
            <li class="chat-item ${isSelected ? 'chat-item--selected' : ''}">
                <div class="chat-item__avatar">
                    {{{ Avatar avatar='${chat.avatar ? chat.avatar : '' }' first_name='${chat.title}' second_name='${chat.title}'}}}
                </div>
                <div class="chat-item__info">
                    <div class="chat-item__info-top">
                        <b>${chat.title}</b>
                        <span>${chat.last_message ? new Date(chat.last_message.time).toLocaleTimeString() : "--:--"}</span>
                    </div>
                    <div class="chat-item__info-bottom">
                        <p><b>${lastUserName}</b>${chat.last_message?.content ? chat.last_message.content : "[no messages yet]" }</p>
                        <div class="chat-item__info-bottom-count ${chat.unread_count < 1 ? "invisible" : ""}">
                            ${ chat.unread_count > 0 ? chat.unread_count : "" } 
                        </div>
                    </div>
                </div>
            </li>
        `)
    }
}
