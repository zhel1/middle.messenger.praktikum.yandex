import Block, {IProps} from "../../core/Block";
import {IChat} from "../../models/IChat.ts";

interface IChatItemProps extends IProps {
    isSelected: boolean
    chat: IChat
    onClick: (chatID: number) => void
}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        props.events = {
            click: (() => {
                if (props.onClick) {
                    props.onClick(props.chat.id)
                }
            })
        }
        super(props);
    }

    public get props() {
        return this._props as IChatItemProps;
    }
    protected render(): string {
        const { unread_msg_count, last_message } = this.props.chat
        return (`
            <li class="chat-item {{#if isSelected}}chat-item--selected{{/if}}">
                {{#with chat}}
                    <div class="chat-item__avatar">
                        {{{ Avatar user=last_message.user}}}
                    </div>
                    <div class="chat-item__info">
                        <div class="chat-item__info-top">
                            <b>{{title}}</b>
                            <span>12:23</span>
                        </div>
                        <div class="chat-item__info-bottom">
                            <p>${last_message.text}</p>
                            <div class="chat-item__info-bottom-count ${unread_msg_count < 1 ? "invisible" : ""}">
                                ${ unread_msg_count > 0 ? unread_msg_count : "" } 
                            </div>
                        </div>
                    </div>
                {{/with}}
            </li>
        `)
    }
}
