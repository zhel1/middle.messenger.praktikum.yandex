import Block, {IProps, RefsType} from "../../core/Block";
import {InputAuth} from "../../components";
import * as validators from "../../utils/validators";
import {navigate} from "../../core/navigate.ts";

export interface ISignUpPageProps extends IProps {
    validate: object
    onSignUp : (event:Event) => void
}

type Ref = {
    first_name: InputAuth
    second_name: InputAuth
    login: InputAuth
    email: InputAuth
    phone: InputAuth
    password: InputAuth
    password2:InputAuth

} & RefsType

export class SignUpPage extends Block<ISignUpPageProps, Ref> {
    constructor() {
        const props : ISignUpPageProps = {
            validate: {
                name: validators.validateName,
                login: validators.validateLogin,
                email: validators.validateEmail,
                phone: validators.validatePhone,
                password: validators.validatePassword
            },
            onSignUp: (event:Event) => {
                event.preventDefault();

                const first_name = this.refs.first_name.value()
                const second_name = this.refs.second_name.value()
                const login = this.refs.login.value()
                const email = this.refs.email.value()
                const phone = this.refs.phone.value()
                const password = this.refs.password.value()
                const password2 = this.refs.password2.value()

                if (first_name !== null &&
                    second_name !== null &&
                    login !== null &&
                    email !== null &&
                    phone !== null &&
                    password !== null &&
                    password2 !== null)
                {
                    navigate('messenger')
                }

                console.log({
                    first_name,
                    second_name,
                    login,
                    email,
                    phone,
                    password,
                    password2
                })
            }
        }

        super(props);
    }

    protected render(): string {
        return(`
            <div class="signup-container">
               
                {{#> FormAuth 
                     caption="Sign up"
                     textOk="Sign up"
                     textCancel="Sign in"
                     pageCancel="signin"
                     onClickOkButton=onSignUp }}
                     
                    {{{ InputAuth
                        label='First name'
                        name='first_name'
                        type='text'
                        value=''
                        placeholder='first name...'
                        validate=validate.name
                        ref='first_name' }}}
                        
                    {{{ InputAuth
                        label='Second Name'
                        name='second_name'
                        type='text'
                        value=''
                        placeholder='second name...'
                        validate=validate.name
                        ref='second_name' }}}
                        
                    {{{ InputAuth
                        label='Login'
                        name='login'
                        type='text'
                        value=''
                        placeholder='login...'
                        validate=validate.login
                        ref='login' }}}
                        
                    {{{ InputAuth
                        label='Email'
                        name='email'
                        type='email'
                        value=''
                        placeholder='email...'
                        validate=validate.email
                        ref='email' }}}
                    
                    {{{ InputAuth
                        label='Phone number'
                        name='phone'
                        type='tel'
                        value=''
                        placeholder='phone number...'
                        validate=validate.phone
                        ref='phone' }}}
                        
                    {{{ InputAuth
                        label='Password'
                        name='password'
                        value=''
                        placeholder='password...'
                        type='password'
                        validate=validate.password
                        ref='password'}}}
                        
                    {{{ InputAuth
                        label='Repeat password'
                        name='password2'
                        value=''
                        placeholder='password...'
                        type='password'
                        validate=validate.password
                        ref='password2'}}}

                {{/FormAuth}}
            </div>
        `)
    }
}
