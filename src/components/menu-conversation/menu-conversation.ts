import Block, {IProps} from "../../core/Block";
import {deleteChat, getChats} from "../../services/chats.ts";
import modalManager from "../../core/dialog-menedger.ts";
import AddUserWgt from "../add-user-wgt";
import RemoveUserWgt from "../remove-user-wgt";

interface IMenuConversationProps extends IProps {
    opened: boolean
    addUser: () => void
    removeUser: () => void
    loadChatAvatar: () => void
    removeConversation: () => void
}

export class MenuConversation extends Block<IMenuConversationProps> {
    constructor(props:IMenuConversationProps) {
        props.opened = false
        props.addUser = () => this.addUser()
        props.removeUser = () => this.removeUser()
        props.loadChatAvatar = () => this.loadChatAvatar()
        props.removeConversation = () => this.removeConversation()
        super(props);
    }

    public get props() {
        return this._props;
    }

    private addUser() {
        if (window.store.getState().currentChatID) {
            modalManager.setModal(new AddUserWgt({}) as unknown as Block<object>);
            modalManager.openModal();
        }
        this.close()
    }

    private removeUser() {
        if (window.store.getState().currentChatID) {
            modalManager.setModal(new RemoveUserWgt({}) as unknown as Block<object>);
            modalManager.openModal();
        }
        this.close()
    }

    private loadChatAvatar() {
        console.log("loadChatAvatar")
        this.close()
    }

    private removeConversation() {
        const currentChatID = window.store.getState().currentChatID
        if (currentChatID) {
            deleteChat(currentChatID)
                .then(() => {
                    getChats({})
                        .then((chats) => {window.store.set({chats: chats});})
                        .catch((error) => console.warn('create chat:', error));
                })
                .catch((error) => console.warn('delete chat:', error));
        }

        this.close()
    }

    private close() {
        this.setProps({opened: false})
    }

    protected render(): string {
        const { opened} = this._props
        return (`            
             <ul class="menu-conversation ${opened ? '' : 'hide'}">
                {{{ MenuItem name='Add users' icon='add' onClick=addUser }}}
                {{{ MenuItem name='Remove users' icon='remove' onClick=removeUser}}}
                {{{ MenuItem name='Load chat avatar' icon='profile' onClick=loadChatAvatar}}}
                {{{ MenuItem name='Delete chat' icon='delete' onClick=removeConversation}}}
            </ul>
        `)
    }
}
