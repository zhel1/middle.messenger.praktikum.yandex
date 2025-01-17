import Block, {IProps} from "../../core/Block";
import modalManager from "../../core/dialog-menedger.ts";
import CreateChatWgt from "../create-chat-wgt";
import Router from "../../core/router";
import {RoutesStrs} from "../../core/config";

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
        Router.getRouter().go(RoutesStrs.settings)
        this.close()
    }

    private CreateChat() {
        modalManager.setModal(new CreateChatWgt({}) as unknown as Block<object>);
        modalManager.openModal();
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
