import Block, {IProps, RefsType} from "../../core/Block";
import InputMsg from "../input-msg";
import {IChat} from "../../models/IChat.ts";
import {ChatList} from "../chat-list/chat-list.ts";
import MenuSettings from "../menu-settings";
import {StoreEvents} from "../../core/Store.ts";

interface ISideBarProps extends IProps {
    chat_list: IChat[]
    onSearchInput: () => void
    onMenuSettingsClick: () => void
}

type Ref = {
    search: InputMsg
    chat_list: ChatList
    menuSettings: MenuSettings
} & RefsType

export class SideBar extends Block<ISideBarProps, Ref> {
    constructor(props: ISideBarProps) {
        window.store.on(StoreEvents.Updated, () => this.onChatsUpdated())

        props.onSearchInput = () => this.onSearchInput()
        props.onMenuSettingsClick = () => this.onMenuSettingsClick()
        super(props);
    }

    private onSearchInput() {
        //Should I ask server to send chat list with current filter or do filter here?
        const searchText = this.refs.search.value()
        const new_chat_list = this._props.chat_list.filter((chat: IChat) => {
            return chat.title.startsWith(searchText)
        })

        this.refs.chat_list.setProps({chat_list: new_chat_list});
    }

    private onMenuSettingsClick() {
        this.refs.menuSettings.setProps({opened: !this.refs.menuSettings.props.opened})
    }

    private onChatsUpdated(){
        this.setProps({chat_list:  window.store.getState().chats})
        this.onSearchInput()
    }

    protected render(): string {
        return (`
            <div class="side-bar">
                <div class="side-bar__header">
                    {{{ InputMsg onInput=onSearchInput placeholder="Search for chat..." name="searh" ref='search' }}}
                    {{{ Button type="settings" onClick=onMenuSettingsClick }}}
                    {{{ MenuSettings ref='menuSettings' }}}
                </div>
                {{{ ChatList chat_list=chat_list ref='chat_list' }}}
            </div>
        `)
    }
}
