import Block, {IProps} from "../../core/Block";
import ChatItem from "../chat-item";

interface IChatListProps extends IProps{
    chat_list: Array<object>
    onChatSelected: (chatID: number) => void
}

export class ChatList extends Block {
    selectedChatID: number
    constructor(props: IChatListProps) {
        props.onChatSelected = (chatID: number) => this.onChatSelected(chatID);
        super(props);

        this.selectedChatID = -1
    }

    public get props() {
        return this._props as IChatListProps;
    }

    private getChatItemByID(chatID: number) {
        return this.refs["chat" + chatID] as ChatItem
    }

    private onChatSelected(chatID: number) {
        this.getChatItemByID(chatID).props.isSelected = true
        this.getChatItemByID(chatID).setProps(this.getChatItemByID(chatID).props)

        if (this.selectedChatID !== -1) {
            this.getChatItemByID(this.selectedChatID).props.isSelected = false
            this.getChatItemByID(this.selectedChatID).setProps(this.getChatItemByID(this.selectedChatID).props)
        }

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
