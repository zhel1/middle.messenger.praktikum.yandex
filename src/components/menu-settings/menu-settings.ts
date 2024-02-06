import Block, {IProps} from "../../core/Block";
import modalManager from "../../core/dialog-menedger.ts";
import ProfileWgt from "../profilewgt";

interface IMenuSettingsProps extends IProps {
    opened: boolean
    openProfile: () => void
    createChat: () => void
}

export class MenuSettings extends Block<IMenuSettingsProps> {
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
        modalManager.setModal(new ProfileWgt({}) as unknown as Block<object>);
        modalManager.openModal();
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
            </ul>
        `)
    }
}
