import Block, {IProps, RefsType} from "../../core/Block";
import * as validators from "../../utils/validators";
import {InputConf} from "../index.ts";
import {ChangePasswordInput} from "../../models/IUser.ts";
import {updatePassword} from "../../services/users.ts";

interface IChangePasswordWgtProps extends IProps {
    validate: object
    opened: boolean
    onSave: (event: Event) => void
    onCancel: (event: Event) => void
}

type Ref = {
    old_password: InputConf
    password: InputConf
    repeat_password: InputConf
} & RefsType

export class ChangePasswordWgt extends Block<IChangePasswordWgtProps, Ref> {
    constructor(props : IChangePasswordWgtProps) {
        const newProps : IChangePasswordWgtProps = {
            ...props,
            validate: {
                password: validators.validatePassword
            },
            onSave: (event: Event) =>  { this.onSave(event) },
            onCancel: (event: Event) => { this.onCancel(event) },
        }

        super(newProps);
    }

    public get props() {
        return this._props as IChangePasswordWgtProps;
    }

    private onCancel(event: Event) {
        event.preventDefault()
        this.setProps({opened: false});
    }

    private onSave(event: Event) {
        event.preventDefault()
        const old_password = this.refs.old_password.value()
        const password = this.refs.password.value()
        const repeat_password = this.refs.repeat_password.value()


        if (password !== repeat_password) {
            const p = {
                error: true,
                errorText: "passwords are not equal"
            }
            this.refs.password.setProps(p)
            this.refs.repeat_password.setProps(p)

            return;
        }

        const data = {
            oldPassword: old_password,
            newPassword: password,
        } as ChangePasswordInput;

        if (Object.values(data).findIndex(value => value === null) === -1) {
            updatePassword(data)
                .then(() => this.setProps({opened: false}))
                .catch((error) => console.warn('change password:', error));
        }
    }

    protected render(): string {
        const { opened } = this._props
        return(`
            <form class="change-password-wgt${opened ? '' : ' hide'}">
                <h1>Change password</h1>
                   
                {{{ InputConf 
                    label="Old password:"
                    type="password"
                    name="old_password"
                    value=''
                    editable=true
                    validate=validate.password
                    placeholder="password..."
                    ref='old_password'}}}
                
                {{{ InputConf 
                    label="New password:" 
                    type="password" 
                    name="password" 
                    value='' 
                    editable=true 
                    validate=validate.password
                    placeholder="password..."                    
                    ref='password' }}}
                
                {{{ InputConf 
                    label="Repeat password:" 
                    type="password" 
                    name="repeat_password" 
                    value='' 
                    editable=true 
                    validate=validate.password
                    placeholder="password..."                    
                    ref='repeat_password' }}}
                    
                {{{ Button 
                    type='secondary'
                    label='Cancel'
                    onClick=onCancel
                    }}}
                    
                {{{ Button 
                    type='primary'
                    label='Save'
                    onClick=onSave
                    }}}
            </form>
        `)
    }
}
