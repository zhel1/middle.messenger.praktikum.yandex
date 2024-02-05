import Block, {IProps, RefsType} from "../../core/Block";
import {ProfileWgt} from "../profilewgt/profilewgt";
interface IMenuSettingsProps extends IProps {
    opened: boolean
    openProfile: () => void
    createChat: () => void
}

type Ref = {
    profile: ProfileWgt
} & RefsType


export class MenuSettings extends Block<IMenuSettingsProps, Ref> {
    constructor(props:IMenuSettingsProps) {
        props.opened = false
        props.openProfile = () => this.OpenProfile()
        props.createChat = () => this.CreateChat()
        super(props);
    }

    public get props() {
        return this._props;
    }

    private OpenProfile() {
        this.refs.profile.setProps({opened: true})
        this.close()
    }

    private CreateChat() {
        console.log("create chat")
        this.close()
    }

    private close() {
       this.setProps({opened: false})
    }

    protected render(): string {
        const { opened} = this._props
        return (`
             <ul class="menu-settings${opened ? '' : ' hide'}">
                {{{ MenuItem name='Open profile' icon='profile' onClick=openProfile }}}
                {{{ MenuItem name='Create chat' icon='chat' onClick=createChat}}}
                
                {{{ ProfileWgt ref='profile' }}}
            </ul>
        `)
    }
}
