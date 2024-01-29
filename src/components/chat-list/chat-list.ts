import Block, {IProps} from "../../core/Block";
import ChatItem from "../chat-item";

interface IChatListProps extends IProps {
    chat_list: Array<object>
    onChatSelected: (chatID: number) => void
}

export class ChatList extends Block<IChatListProps> {
    private selectedChatID: number = -1

    constructor(props: IChatListProps) {
        props.onChatSelected = (chatID: number) => this.onChatSelected(chatID);
        super(props);
    }

    private getChatItemByID(chatID: number): ChatItem {
        return this.refs["chat" + chatID] as ChatItem
    }

    private onChatSelected(chatID: number) {
        this.getChatItemByID(chatID).setProps({isSelected: true})
        this.getChatItemByID(this.selectedChatID)?.setProps({isSelected: false})
        this.selectedChatID = chatID
        console.log("current chat id: ", chatID)
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
