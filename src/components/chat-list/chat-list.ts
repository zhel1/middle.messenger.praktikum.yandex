import Block, {IProps} from "../../core/Block";
import ChatItem from "../chat-item";
import {IChat} from "../../models/IChat.ts";

interface IChatListProps extends IProps {
    chat_list: IChat[]
    onChatSelected: (chatID: number) => void
}

export class ChatList extends Block<IChatListProps> {

    constructor(props: IChatListProps) {
        props.onChatSelected = (chatID: number) => this.onChatSelected(chatID);
        super(props);
    }

    private getChatItemByID(chatID: number): ChatItem {
        return this.refs["chat" + chatID] as ChatItem
    }

    private onChatSelected(chatID: number) {
        const selectedChatID = window.store.getState().currentChatID
        if (selectedChatID) {
            this.getChatItemByID(selectedChatID)?.setProps({isSelected: false})
        }

        this.getChatItemByID(chatID).setProps({isSelected: true})
        window.store.set({ currentChatID: chatID})
    }

    protected render(): string {
        return (`
            <ul class="chat-list">
                {{#each chat_list as |chat|}}
                    {{{ ChatItem chat=chat onClick=../onChatSelected isSelected=chat.isSelected ref=(concat 'chat' chat.id)}}}
                {{/each}}
            </ul>
        `)
    }
}
