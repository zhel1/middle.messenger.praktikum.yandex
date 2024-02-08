import Block, {IProps, RefsType} from "../../core/Block";
import InputMsg from "../input-msg";
import {IChat} from "../../models/IChat.ts";
import {ChatList} from "../chat-list/chat-list.ts";
import MenuSettings from "../menu-settings";
import {StoreEvents} from "../../core/Store.ts";

interface ISideBarProps extends IProps {
    chatList: IChat[]
    onSearchInput: () => void
    onMenuSettingsClick: () => void
}

type Ref = {
    search: InputMsg
    chat_list: ChatList
    menu_settings: MenuSettings
} & RefsType

export class SideBar extends Block<ISideBarProps, Ref> {
    constructor(props: ISideBarProps) {
        window.store.on(StoreEvents.Updated, () => this.onChatsUpdated())

        props.chatList = window.store.getState().chats
        props.onSearchInput = () => this.onSearchInput()
        props.onMenuSettingsClick = () => this.onMenuSettingsClick()
        super(props);
    }

    private onSearchInput() {
        //Should I ask server to send chat list with current filter or do filter here?
        const searchText = this.refs.search.value()
        const new_chat_list = this._props.chatList.filter((chat: IChat) => {
            return chat.title.startsWith(searchText)
        })

        this.refs.chat_list.setProps({chatList: new_chat_list});
    }

    private onMenuSettingsClick() {
        this.refs.menu_settings.setProps({opened: !this.refs.menu_settings.props.opened})
    }

    private onChatsUpdated() {
        this.setProps({chatList: window.store.getState().chats})
        this.onSearchInput()
    }

    protected render(): string {
        return (`
            <div class="side-bar">
                <div class="side-bar__header">
                    {{{ InputMsg onInput=onSearchInput placeholder="Search for chat..." name="searh" ref='search' }}}
                    {{{ Button type="settings" onClick=onMenuSettingsClick }}}
                    {{{ MenuSettings ref='menu_settings' }}}
                </div>
                {{{ ChatList chatList=chatList ref='chat_list' }}}
            </div>
        `)
    }
}
