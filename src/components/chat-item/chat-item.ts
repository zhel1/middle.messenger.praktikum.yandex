import Block, {IProps} from "../../core/Block";
import {IChat} from "../../models/IChat.ts";

interface IChatItemProps extends IProps {
    isSelected: boolean
    chat: IChat
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
        //const { unread_count, last_message, avatar } = this._props.chat
        const chat = this._props.chat
        return (`
            <li class="chat-item {{#if isSelected}}chat-item--selected{{/if}}">
                {{#with chat}}
                    <div class="chat-item__avatar">
                        {{{ Avatar avatar=../chat.avatar first_name=../chat.title second_name=../chat.title}}}
                    </div>
                    <div class="chat-item__info">
                        <div class="chat-item__info-top">
                            <b>{{title}}</b>
                            <span>12:23</span>
                        </div>
                        <div class="chat-item__info-bottom">
                            <p>${chat.last_message?.content}</p>
                            <div class="chat-item__info-bottom-count ${chat.unread_count < 1 ? "invisible" : ""}">
                                ${ chat.unread_count > 0 ? chat.unread_count : "" } 
                            </div>
                        </div>
                    </div>
                {{/with}}
            </li>
        `)
    }
}
