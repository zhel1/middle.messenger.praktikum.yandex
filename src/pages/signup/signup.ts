import Block, {IProps} from "../../core/Block";
import {InputAuth} from "../../components";
import * as validators from "../../utils/validators";

export interface ISignUpPageProps extends IProps {
    validate: {}
    onSignUp : (event:Event) => void
}

export class SignUpPage extends Block {
    constructor() {
        const props : ISignUpPageProps = {
            events:{},
            validate: {
                name: validators.validateName,
                login: validators.validateLogin,
                email: validators.validateEmail,
                phone: validators.validatePhone,
                password: validators.validatePassword
            },
            onSignUp: (event:Event) => {
                event.preventDefault();

                const first_name = (this.getRefs().first_name as InputAuth).value()
                const second_name = (this.getRefs().second_name as InputAuth).value()
                const login = (this.getRefs().login as InputAuth).value()
                const email = (this.getRefs().email as InputAuth).value()
                const phone = (this.getRefs().phone as InputAuth).value()
                const password =  (this.getRefs().password as InputAuth).value()
                const password2 =  (this.getRefs().password2 as InputAuth).value()

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
                     pageOk="messenger"
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
