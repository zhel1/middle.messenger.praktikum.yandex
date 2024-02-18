import Block, {IProps, RefsType} from "../../core/Block";
import {Conversation} from "../../components";
import {StoreEvents} from "../../core/Store.ts";

export interface IMessengerPageProps extends IProps {
    selectedChatID?: number | null
}

type Ref = {
    conversation: Conversation
} & RefsType

export class MessengerPage extends Block<IMessengerPageProps, Ref> {
    constructor() {
        window.store.on(StoreEvents.Updated, () => this.onCurrentChatUpdated())
        super();
    }

    private onCurrentChatUpdated() {
        const currentChatID = window.store.getState().currentChatID
        if (currentChatID && this._props.selectedChatID !== currentChatID) {
            this.refs.conversation.setProps({selectedChatID: currentChatID})
        }

        const state = window.store.getState()
        if (state.currentChatID) {
            this.refs.conversation.setProps({chat: state.chats.find((chat) => chat.id === state.currentChatID )})
        }
    }

    protected render(): string {
        return(`
            <div class="messenger">
                {{{ SideBar }}}
                {{{ Conversation ref='conversation' }}}
            </div>
        `)
    }

}
