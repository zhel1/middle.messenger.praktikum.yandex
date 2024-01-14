import Block, {IProps} from "../../core/Block";
import InputMsg from "../input-msg";
import IChatListProps from "../chat-list"

interface ISideBarProps extends IProps{
    chat_list: Array<object>
    onSearchInput: () => void
}

export class SideBar extends Block {
    constructor(props: ISideBarProps) {
        props.onSearchInput = () => this.onSearchInput()

        super(props);
    }

    public get props() {
        return this._props as ISideBarProps;
    }

    private onSearchInput() {
        //Should I ask server to send chat list with current filter or do filter here?
        const searchText = (this.refs.search as InputMsg).value()
        const new_chat_list = this.props.chat_list.filter((chat) => {
            //@ts-expect-error We don't know yet the real structure of chat to describe it though interface. This is temp decision.
            return chat.title.startsWith(searchText)
        })

        const chatListProps = (this.refs.chat_list as IChatListProps).props
        chatListProps.chat_list = new_chat_list
        this.refs.chat_list.setProps(chatListProps);
    }

    protected render(): string {
        return (`
            <div class="side-bar">
                <div class="side-bar__header">
                    {{{ InputMsg onInput=onSearchInput placeholder="Search for chat..." name="searh" ref='search' }}}
                    {{{ Button type="settings" page="profile" }}}
                </div>
                {{{ ChatList chat_list=chat_list ref='chat_list' }}}
            </div>
        `)
    }
}
