import Block, {IProps, RefsType} from "../../core/Block";
import InputMsg from "../input-msg";
import {IChat} from "../../models/IChat.ts";
import {ProfileWgt} from "../profilewgt/profilewgt.ts";
import {ChatList} from "../chat-list/chat-list.ts";

interface ISideBarProps extends IProps {
    chat_list: Array<IChat>
    onSearchInput: () => void
    onProfileClick: () => void
    onProfileClose: () => void
}

type Ref = {
    search: InputMsg
    chat_list: ChatList
    profile: ProfileWgt
} & RefsType

export class SideBar extends Block<ISideBarProps, Ref> {
    constructor(props: ISideBarProps) {
        props.onSearchInput = () => this.onSearchInput()
        props.onProfileClick = () => this.onProfileClick()
        props.onProfileClose = () => this.onProfileClose()
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

    private onProfileClick() {
        this.refs.profile.setProps({opened: true})
    }

    private onProfileClose() {
        this.refs.profile.setProps({opened: false})
    }

    protected render(): string {
        return (`
            <div class="side-bar">
                <div class="side-bar__header">
                    {{{ InputMsg onInput=onSearchInput placeholder="Search for chat..." name="searh" ref='search' }}}
                    {{{ Button type="settings" onClick=onProfileClick }}}
                </div>
                {{{ ChatList chat_list=chat_list ref='chat_list' }}}
                {{{ ProfileWgt onBack=onProfileClose ref='profile' }}}
            </div>
        `)
    }
}
