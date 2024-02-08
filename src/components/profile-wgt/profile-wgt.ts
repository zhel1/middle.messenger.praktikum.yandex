import Block, {IProps, RefsType} from "../../core/Block";
import * as validators from "../../utils/validators";
import {InputConf, ChangePasswordWgt, ChangeAvatarWgt} from "../../components";
import Router from "../../core/router.ts";
import {RoutesStrs} from "../../core/config.ts";
import {StoreEvents} from "../../core/Store.ts";
import {IUser} from "../../models/IUser.ts";
import {logout} from "../../services/auth.ts";
import {updateProfile} from "../../services/users.ts";
import modalManager from "../../core/dialog-menedger.ts";

interface IProfileWgtProps extends IProps {
    validate?: object
    editable?: boolean
    user?: IUser | null
    onChangePassword?: (event:Event) => void
    onChangeAvatar?: (event:Event) => void
    onEditCancel?: (event:Event) => void
    onSave?: (event:Event) => void
    onLogOut?: (event:Event) => void
    onBack?: (event:Event) => void
    onEdit?: (event:Event) => void
}

type Ref = {
    first_name: InputConf,
    second_name: InputConf,
    display_name: InputConf,
    login: InputConf,
    email: InputConf,
    phone: InputConf,
} & RefsType

export class ProfileWgt extends Block<IProfileWgtProps, Ref> {
    constructor(props : IProfileWgtProps) {
        window.store.on(StoreEvents.Updated, () => this.onUserUpdated())
        const newProps : IProfileWgtProps = {
            ...props,
            user: window.store.getState().user,
            validate: {
                name: validators.validateName,
                login: validators.validateLogin,
                email: validators.validateEmail,
                phone: validators.validatePhone,
                password: validators.validatePassword
            },
            onChangePassword: (event: Event) => {
                event.preventDefault();
                modalManager.setModal(new ChangePasswordWgt({}) as unknown as Block<object>);
            },
            onChangeAvatar: (event: Event) => {
                event.preventDefault();
                modalManager.setModal(new ChangeAvatarWgt({
                    mode: 'user',
                    close: () => {
                        modalManager.setModal(new ProfileWgt({editable: true}) as unknown as Block<object>);
                        modalManager.openModal()
                    }
                }) as unknown as Block<object>);
            },
            onEditCancel: (event: Event) => {
                event.preventDefault();
                this.setProps({editable: false});
            },
            onSave: (event: Event) => {
                event.preventDefault();

                const data = {
                    first_name: this.refs.first_name.value(),
                    second_name: this.refs.second_name.value(),
                    display_name: this.refs.display_name.value(),
                    login: this.refs.login.value(),
                    email: this.refs.email.value(),
                    phone: this.refs.phone.value()
                } as IUser;

                if (Object.values(data).findIndex(value => value === null) === -1) {
                    updateProfile(data)
                        .then(() => this.setProps({ editable: false }))
                        .catch((error) => console.warn('update profile:', error));
                }
            },
            onLogOut: (event: Event) => {
                event.preventDefault();
                logout()
                    .then(() => Router.getRouter().go(RoutesStrs.signin))
                    .catch((error) => console.warn('logout:', error));
            },
            onEdit: (event: Event) => {
                event.preventDefault();
                this.setProps({ editable: true });
            },
            onBack: (event: Event) => {
                event.preventDefault();
                this.setProps({ editable: false });
                modalManager.closeModal();
            },
        }

        super(newProps);
    }

    private onUserUpdated(){
        this.setProps({user:  window.store.getState().user})
    }

    public get props() {
        return this._props;
    }

    protected render(): string {
        const { editable } = this._props
        return(`
            {{#> FormProfile 
                onChangePassword=onChangePassword
                onChangeAvatar=onChangeAvatar
                onEditCancel=onEditCancel
                onSave=onSave
                onLogOut=onLogOut
                onBack=onBack }}
                
                {{{ InputConf 
                    label="First name:"
                    type="text"
                    name="first_name"
                    value=user.first_name
                    editable=${editable}
                    validate=validate.name
                    ref='first_name'}}}
                
                {{{ InputConf 
                    label="Second name:" 
                    type="text" 
                    name="second_name" 
                    value=user.second_name 
                    editable=${editable} 
                    validate=validate.name 
                    ref='second_name' }}}
                
                {{{ InputConf 
                    label="Display name:" 
                    type="text" 
                    name="display_name" 
                    value=user.display_name 
                    editable=${editable} 
                    validate=validate.name
                    ref='display_name' }}}
                
                {{{ InputConf 
                    label="Login:" 
                    type="text" 
                    name="login" 
                    value=user.login 
                    editable=${editable} 
                    validate=validate.login
                    ref='login' }}}
                
                {{{ InputConf 
                    label="Email:" 
                    type="email" 
                    name="email" 
                    value=user.email 
                    editable=${editable} 
                    validate=validate.email
                    ref='email' }}}
                
                {{{ InputConf 
                    label="Phone:" 
                    type="tel" 
                    name="phone" 
                    value=user.phone 
                    editable=${editable} 
                    validate=validate.phone
                    ref='phone' }}}
                    
            {{/FormProfile}}
        `)
    }
}