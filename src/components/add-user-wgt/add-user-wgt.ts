import Block, {IProps, RefsType} from "../../core/Block";
import {InputConf} from "../index.ts";
import modalManager from "../../core/dialog-menedger.ts";
import {searchUserByLogin} from "../../services/users.ts";
import {IUser} from "../../models/IUser.ts";
import {addUserToChat} from "../../services/chats";
import {TAddDeleteUserInput} from "../../models/IChat";

interface IAddUserWgtProps extends IProps {
    usersToChoose?: IUser[]
    usersToAdd?: IUser[]
    onSearch?: (event: Event) => void
    onAdd?: (event: Event) => void
    onCancel?: (event: Event) => void
    onAddUser?: (event: Event, user: IUser) => void
    onRemoveUser?: (event: Event, user: IUser) => void
}

type Ref = {
    search: InputConf
} & RefsType

export class AddUserWgt extends Block<IAddUserWgtProps, Ref> {
    constructor(props : IAddUserWgtProps) {
        const newProps : IAddUserWgtProps = {
            ...props,
            onSearch: (event: Event) =>  { this.onSearch(event) },
            onAdd: (event: Event) =>  { this.onAdd(event) },
            onCancel: (event: Event) => { this.onCancel(event) },
            onAddUser: (event: Event, user: IUser) =>  { this.onAddUser(event, user) },
            onRemoveUser: (event: Event, user: IUser) =>  { this.onRemoveUser(event, user) },
            usersToChoose: [],
            usersToAdd: []
        }

        super(newProps);
    }

    private onSearch(event: Event) {
        event.preventDefault()
        const login = this.refs.search.value()
        if (login) {
            searchUserByLogin(login)
                .then(users => {
                    this.setProps({usersToChoose: users})
                })
                .catch((error) => console.warn('search users:', error));
        }
    }

    private onCancel(event: Event) {
        event.preventDefault()
        modalManager.closeModal()
    }

    private onAddUser(event: Event, user: IUser) {
        event.preventDefault()

        const usersToAdd = this._props.usersToAdd
        usersToAdd?.push(user)

        const usersToChoose = this._props.usersToChoose?.filter((u: IUser) => {
            return u.id !== user.id
        })

        this.setProps({usersToAdd: usersToAdd, usersToChoose: usersToChoose})
    }

    private onRemoveUser(event: Event, user: IUser) {
        event.preventDefault()

        const usersToChoose = this._props.usersToChoose
        usersToChoose?.push(user)

        const usersToAdd = this._props.usersToAdd?.filter((u: IUser) => {
            return u.id !== user.id
        })

        this.setProps({usersToAdd: usersToAdd, usersToChoose: usersToChoose})
    }

    private onAdd(event: Event) {
        event.preventDefault()
        const usersToAdd = this._props.usersToAdd
        const currentChatID = window.store.getState().currentChatID
        if (usersToAdd && currentChatID) {
            addUserToChat({
                users: usersToAdd.map((u) => u.id),
                chatId: currentChatID
            } as TAddDeleteUserInput)
                .then(() => modalManager.closeModal())
                .catch((error) => console.warn('add users to chat:', error));
        }
    }

    protected render(): string {
        const {usersToChoose, usersToAdd } = this._props
        return(`
            <form class="add-user-wgt">
                <h1>Add users</h1>
                   
                {{{ InputMsg 
                    label="Title"
                    type="text"
                    name="title"
                    value=''
                    editable=true
                    validate=validate.title
                    placeholder="login..."
                    ref='search'}}}
                   
                {{{ Button 
                    type='primary'
                    label='Search users'
                    onClick=onSearch
                    }}}
                    
                ${(usersToChoose && usersToChoose.length > 0) ?
                    '<p>Found users:</p>'
                        : 
                    ''}
                    
                <div class="add-user-wgt__users">
                    {{#each usersToChoose as |user|}}
                        {{{ UserItem user=user icon='plus' onClick=../onAddUser}}}
                    {{/each}}
                </div>   
                
                ${(usersToAdd && usersToAdd.length > 0) ?
                    '<p>Users to add:</p>'
                        :
                    ''}
                
                <div class="add-user-wgt__users">
                    {{#each usersToAdd as |user|}}
                        {{{ UserItem user=user icon='delete' onClick=../onRemoveUser}}}
                    {{/each}}
                </div>  
                    
                {{{ Button 
                    type='secondary'
                    label='Cancel'
                    onClick=onCancel
                    }}}
                    
                {{{ Button 
                    type='primary'
                    label='Add'
                    onClick=onAdd
                    }}}
            </form>
        `)
    }
}
