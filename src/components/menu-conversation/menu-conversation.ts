import Block, {IProps} from "../../core/Block";

interface IMenuConversationProps extends IProps {
    opened: boolean
    addUser: () => void
    removeUser: () => void
    openUserProfile: () => void
    removeConversation: () => void
}

export class MenuConversation extends Block<IMenuConversationProps> {
    constructor(props:IMenuConversationProps) {
        props.opened = false
        props.addUser = () => this.addUser()
        props.removeUser = () => this.removeUser()
        props.openUserProfile = () => this.openUserProfile()
        props.removeConversation = () => this.removeConversation()
        super(props);
    }

    public get props() {
        return this._props;
    }

    private addUser() {
        console.log("addUser")
        this.close()
    }

    private removeUser() {
        console.log("removeUser")
        this.close()
    }

    private openUserProfile() {
        console.log("openUserProfile")
        this.close()
    }

    private removeConversation() {
        console.log("removeConversation")
        this.close()
    }

    private close() {
        this.setProps({opened: false})
    }

    protected render(): string {
        const { opened} = this._props
        return (`            
             <ul class="menu-conversation ${opened ? '' : 'hide'}">
                {{{ MenuItem name='Add user' icon='add' onClick=addUser }}}
                {{{ MenuItem name='Remove user' icon='remove' onClick=removeUser}}}
                {{{ MenuItem name='Profile' icon='profile' onClick=openUserProfile}}}
                {{{ MenuItem name='Delete chat' icon='delete' onClick=removeConversation}}}
            </ul>
        `)
    }
}
