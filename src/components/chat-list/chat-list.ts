import Block, {IProps} from "../../core/Block";
import {TChat} from "../../models/TChat.ts";
import {scrollToEnd} from "../../utils/scroll";

interface IChatListProps extends IProps {
    chatList: TChat[]
    onChatSelected: (chatID: number) => void
}

export class ChatList extends Block<IChatListProps> {
    constructor(props: IChatListProps) {
        props.onChatSelected = (chatID: number) => this.onChatSelected(chatID);
        super(props);
    }

    private onChatSelected(chatID: number) {
        window.store.set({ currentChatID: chatID})
        scrollToEnd()
    }

    protected render(): string {
        return (`
            <ul class="chat-list">
                {{#each chatList as |chat|}}
                    {{{ ChatItem chat=chat onClick=../onChatSelected isSelected=chat.isSelected}}}
                {{/each}}
            </ul>
        `)
    }
}
