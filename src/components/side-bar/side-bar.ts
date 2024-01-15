import Block, {IProps} from "../../core/Block";
import InputMsg from "../input-msg";
import IChatListProps from "../chat-list"
import {IChat} from "../../models/IChat.ts";
import {ProfileWgt} from "../profilewgt/profilewgt.ts";

interface ISideBarProps extends IProps{
    chat_list: Array<IChat>
    onSearchInput: () => void
    onProfileClick: () => void
    onProfileClose: () => void
}

export class SideBar extends Block {
    constructor(props: ISideBarProps) {
        props.onSearchInput = () => this.onSearchInput()
        props.onProfileClick = () => this.onProfileClick()
        props.onProfileClose = () => this.onProfileClose()


        super(props);
    }

    public get props() {
        return this._props as ISideBarProps;
    }

    private getProfile() {
        return this.refs.profile as ProfileWgt
    }

    private onSearchInput() {
        //Should I ask server to send chat list with current filter or do filter here?
        const searchText = (this.refs.search as InputMsg).value()
        const new_chat_list = this.props.chat_list.filter((chat: IChat) => {
            return chat.title.startsWith(searchText)
        })

        const chatListProps = (this.refs.chat_list as IChatListProps).props
        chatListProps.chat_list = new_chat_list
        this.refs.chat_list.setProps(chatListProps);
    }

    private onProfileClick() {
        this.getProfile().props.opened = true
        this.getProfile().setProps(this.getProfile().props)
    }

    private onProfileClose() {
        this.getProfile().props.opened = false
        this.getProfile().setProps(this.getProfile().props)
    }

    protected render(): string {
        return (`
            <div class="side-bar">
                <div class="side-bar__header">
                    {{{ InputMsg onInput=onSearchInput placeholder="Search for chat..." name="searh" ref='search' }}}
                    {{{ Button type="settings" onClick=onProfileClick }}}
                </div>
                {{{ ChatList chat_list=chat_list ref='chat_list' }}}
                {{{ ProfileWgt ref='profile' onBack=onProfileClose }}}
            </div>
        `)
    }
}
