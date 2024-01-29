import Block, {IProps} from "../../core/Block";
import * as validators from "../../utils/validators";
import {InputAuth} from "../../components";
import {navigate} from "../../core/navigate";

export interface IProfilePageProps extends IProps {
    validate: object
    editable: boolean
    user: object
    onChangePassword: (event:Event) => void
    onEditCancel: (event:Event) => void
    onSave: (event:Event) => void
    onLogOut: (event:Event) => void
    onBack: (event:Event) => void
    onEdit: (event:Event) => void
}

export class ProfilePage extends Block<IProfilePageProps> {
    constructor() {
        const props : IProfilePageProps = {
            editable: false,
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
                console.log("onChangePassword")
            },
            onEditCancel: (event: Event) => {
                event.preventDefault();
                this.props.editable = false
                this.setProps(this.props);
            },
            onSave: (event: Event) => {
                event.preventDefault();

                const first_name = (this.refs.first_name as InputAuth).value()
                const second_name = (this.refs.second_name as InputAuth).value()
                const display_name = (this.refs.display_name as InputAuth).value()
                const login = (this.refs.login as InputAuth).value()
                const email = (this.refs.email as InputAuth).value()
                const phone = (this.refs.phone as InputAuth).value()

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

                this.props.editable = false
                this.setProps(this.props);

            },
            onLogOut: (event: Event) => {
                event.preventDefault();
                navigate('signin')
            },
            onBack: (event: Event) => {
                event.preventDefault();
                console.log("onBack")
            },
            onEdit: (event: Event) => {
                event.preventDefault();
                this.props.editable = true
                this.setProps(this.props);
            }
        }

        super(props);
    }

    public get props() {
        return this._props as IProfilePageProps;
    }

    protected render(): string {
        const { editable } = this._props as IProfilePageProps
        return(`
            <div class="messenger">
                <div class="messenger__widget">
                    {{#> FormProfile 
                        onChangePassword=onChangePassword
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
                </div>
            </div>
        `)
    }
}
