import Block, {IProps} from "../../core/Block";
import modalManager from "../../core/dialog-menedger.ts";
import {IUser} from "../../models/IUser.ts";
import {deleteUsersFromChat, getChatUsers} from "../../services/chats";
import {TAddDeleteUserInput} from "../../models/IChat";

interface IRemoveUserWgtProps extends IProps {
    usersToChoose?: IUser[]
    usersToRemove?: IUser[]
    onRemove?: (event: Event) => void
    onCancel?: (event: Event) => void
    onRemoveUser?: (event: Event, user: IUser) => void
    onAddUser?: (event: Event, user: IUser) => void
}

export class RemoveUserWgt extends Block<IRemoveUserWgtProps> {
    constructor(props : IRemoveUserWgtProps) {
        const newProps : IRemoveUserWgtProps = {
            ...props,
            onRemove: (event: Event) =>  { this.onRemove(event) },
            onCancel: (event: Event) => { this.onCancel(event) },
            onRemoveUser: (event: Event, user: IUser) =>  { this.onRemoveUser(event, user) },
            onAddUser: (event: Event, user: IUser) =>  { this.onAddUser(event, user) },
            usersToChoose: [],
            usersToRemove: []
        }

        const currentChatID = window.store.getState().currentChatID
        if (currentChatID) {
            getChatUsers(currentChatID)
                .then((users) => this.setProps({usersToChoose: users}))
                .catch((error) => console.warn('get users in chat:', error));
        }

        super(newProps);
    }

    private onCancel(event: Event) {
        event.preventDefault()
        modalManager.closeModal()
    }

    private onAddUser(event: Event, user: IUser) {
        event.preventDefault()

        const usersToChoose = this._props.usersToChoose
        usersToChoose?.push(user)

        const usersToRemove = this._props.usersToRemove?.filter((u: IUser) => {
            return u.id !== user.id
        })

        this.setProps({usersToRemove: usersToRemove, usersToChoose: usersToChoose})
    }

    private onRemoveUser(event: Event, user: IUser) {
        event.preventDefault()

        const usersToRemove = this._props.usersToRemove
        usersToRemove?.push(user)

        const usersToChoose = this._props.usersToChoose?.filter((u: IUser) => {
            return u.id !== user.id
        })

        this.setProps({usersToRemove: usersToRemove, usersToChoose: usersToChoose})
    }

    private onRemove(event: Event) {
        event.preventDefault()
        const usersToRemove = this._props.usersToRemove
        const currentChatID = window.store.getState().currentChatID
        if (usersToRemove && currentChatID) {
            deleteUsersFromChat({
                users: usersToRemove.map((u) => u.id),
                chatId: currentChatID
            } as TAddDeleteUserInput)
                .then(() => modalManager.closeModal())
                .catch((error) => console.warn('remove users from chat:', error));
        }
    }

    protected render(): string {
        const {usersToChoose, usersToRemove } = this._props
        return(`
            <form class="remove-user-wgt">
                <h1>Remove users</h1>
                    
                ${(usersToChoose && usersToChoose.length > 0) ?
                '<p>Users in chat:</p>'
                :
                ''}
                    
                <div class="remove-user-wgt__users">
                    {{#each usersToChoose as |user|}}
                        {{{ UserItem user=user icon='delete' onClick=../onRemoveUser}}}
                    {{/each}}
                </div>   
                
                ${(usersToRemove && usersToRemove.length > 0) ?
                '<p>Users to remove:</p>'
                :
                ''}
                
                <div class="remove-user-wgt__users">
                    {{#each usersToRemove as |user|}}
                        {{{ UserItem user=user icon='plus' onClick=../onAddUser}}}
                    {{/each}}
                </div>  
                    
                {{{ Button 
                    type='secondary'
                    label='Cancel'
                    onClick=onCancel
                    }}}
                    
                {{{ Button 
                    type='primary'
                    label='Remove'
                    onClick=onRemove
                    }}}
            </form>
        `)
    }
}