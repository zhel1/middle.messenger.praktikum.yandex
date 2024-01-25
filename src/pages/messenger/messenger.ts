import Block, {IProps} from "../../core/Block";
import * as Data from "../../data";

export interface IMessengerPageProps extends IProps {
    chat_list: Array<object>
    conversation: object
    msg_list: Array<object>
}

export class MessengerPage extends Block {
    constructor() {
        const props : IMessengerPageProps = {
            events:{},
            chat_list: Data.ChatListData,
            conversation: Data.ConversationData,
            msg_list: Data.MsgListData
        }
        super(props);
    }

    protected render(): string {
        const msgListIsNotEmpty = (this._props as IMessengerPageProps).msg_list.length > 0
        return(`
            <div class="messenger">
                {{{ SideBar chat_list=chat_list}}}
                {{#if ${msgListIsNotEmpty} }}
                    {{{ Conversation conversation=conversation msg_list=msg_list}}}
                {{^}}
                    <span class="messenger__placeholder">Choose a chat to start messaging.</span>
                {{/if}}
            </div>
        `)
    }
}
