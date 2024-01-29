import Block, {IProps, RefsType} from "../../core/Block";
import * as validators from "../../utils/validators";
import {InputConf} from "../index.ts";

interface IChangePasswordWgtProps extends IProps {
    validate: object
    opened: boolean
    onSave: () => void
    onCancel: () => void
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
            onSave: () =>  { this.onSave() },
            onCancel: () => { this.onCancel() },
        }

        super(newProps);
    }

    public get props() {
        return this._props as IChangePasswordWgtProps;
    }

    private onCancel() {
        this.setProps({opened: false});
    }

    private onSave() {
        const old_password = this.refs.old_password.value()
        const password = this.refs.password.value()
        const repeat_password = this.refs.repeat_password.value()


        console.log({
            old_password,
            password,
            repeat_password,
        })

        if (old_password == null ||
            password == null ||
            repeat_password == null) {
            return
        }

        this.onCancel()
    }

    protected render(): string {
        const { opened} = this._props
        return(`
            <form class="change-password-wgt${opened ? '' : ' hide'}">
                   
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
                    type='link'
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
