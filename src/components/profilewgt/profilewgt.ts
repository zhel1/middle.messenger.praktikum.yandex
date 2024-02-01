import Block, {IProps, RefsType} from "../../core/Block";
import * as validators from "../../utils/validators";
import {ChangePasswordWgt, InputConf} from "../../components";
import Router from "../../core/router.ts";
import {RoutesStrs} from "../../core/config.ts";

interface IProfileWgtProps extends IProps {
    validate: object
    editable: boolean
    opened: boolean
    user: object
    onChangePassword: (event:Event) => void
    onChangeAvatar: (event:Event) => void
    onEditCancel: (event:Event) => void
    onSave: (event:Event) => void
    onLogOut: (event:Event) => void
    onBack: (event:Event) => void
    onEdit: (event:Event) => void
}

type Ref = {
    first_name: InputConf,
    second_name: InputConf,
    display_name: InputConf,
    login: InputConf,
    email: InputConf,
    phone: InputConf,
    changePasswordWgt: ChangePasswordWgt,
} & RefsType

export class ProfileWgt extends Block<IProfileWgtProps, Ref> {
    constructor(props : IProfileWgtProps) {
        const newProps : IProfileWgtProps = {
            ...props,
            events:{
                click: (evt ) => {
                    evt.preventDefault()
                    if (evt.target instanceof Element && evt.target.className === "profile" ) {
                        this.props.onBack(evt)
                    }
                }
            },
            editable: false,
            opened: false,
            validate: {
                name: validators.validateName,
                login: validators.validateLogin,
                email: validators.validateEmail,
                phone: validators.validatePhone,
                password: validators.validatePassword
            },
            user: {
                avatar: "https://fikiwiki.com/uploads/posts/2022-02/1644885500_22-fikiwiki-com-p-kartinki-dlya-geimerov-na-avu-26.jpg",
                first_name: "Ivan",
                second_name: "Ivanov",
                display_name : "Ivanchik",
                login: "ivan1645",
                email: "email@gmail.com",
                phone: "+78005553535",
                password: "0123456789"
            },
            onChangePassword: (event: Event) => {
                event.preventDefault();
                this.refs.changePasswordWgt.setProps({opened: true})
            },
            onChangeAvatar: (event: Event) => {
                event.preventDefault();
                console.log("onChangeAvatar")
            },
            onEditCancel: (event: Event) => {
                event.preventDefault();
                this.setProps({editable: false});
            },
            onSave: (event: Event) => {
                event.preventDefault();

                const first_name = this.refs.first_name.value()
                const second_name = this.refs.second_name.value()
                const display_name = this.refs.display_name.value()
                const login = this.refs.login.value()
                const email = this.refs.email.value()
                const phone = this.refs.phone.value()

                console.log({
                    first_name,
                    second_name,
                    display_name,
                    login,
                    email,
                    phone,
                })

                if (first_name == null ||
                    second_name == null ||
                    display_name == null ||
                    login == null ||
                    email == null ||
                    phone == null) {
                    return
                }

                this.setProps({editable: false});

            },
            onLogOut: (event: Event) => {
                event.preventDefault();
                Router.getRouter().go(RoutesStrs.signin)
            },
            onEdit: (event: Event) => {
                event.preventDefault();
                this.setProps({editable: true});
            },
            onBack: (event: Event) => {
                event.preventDefault();
                this.setProps({
                    opened: false,
                    editable: false,
                });
            },
        }

        super(newProps);
    }

    public get props() {
        return this._props;
    }

    protected render(): string {
        const { editable , opened} = this._props
        return(`
            <div class="profile${opened ? '' : ' hide'}">
                <div class="profile__widget">
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
                    
                    {{{ ChangePasswordWgt ref='changePasswordWgt'}}}
                </div>
            </div>
        `)
    }
}
