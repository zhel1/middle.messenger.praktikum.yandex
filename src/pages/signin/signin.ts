import Block, {IProps} from "../../core/Block";
import {InputAuth} from "../../components";
import * as validators from '../../utils/validators';
export interface ISignInPageProps extends IProps {
    validate: {}
    onSignIn : (event:Event) => void
}
export class SignInPage extends Block {
    constructor() {
        const props : ISignInPageProps = {
            events:{},
            validate: {
                login: validators.validateLogin,
                password: validators.validatePassword
            },
            onSignIn: (event:Event) => {
                event.preventDefault();

                const login = (this.getRefs().login as InputAuth).value()
                const password =  (this.getRefs().password as InputAuth).value()

                console.log({
                    login,
                    password
                })
            }
        }

        super(props);
    }
    protected render(): string {
        return(`
            <div class="signin-container">
                {{#> FormAuth 
                     caption="Sign in"
                     textOk="Sign in"
                     pageOk="messenger"
                     textCancel="Sign up"
                     pageCancel="signup"
                     onClickOkButton=onSignIn }}
                
                    {{{ InputAuth
                        label='Login'
                        name='login'
                        value=''
                        placeholder='login...'
                        type='text'
                        validate=validate.login
                        ref='login' }}}
                        
                    {{{ InputAuth
                        label='Password'
                        name='password'
                        value=''
                        placeholder='password...'
                        type='password'
                        validate=validate.password
                        ref='password'}}}
                        
                {{/FormAuth}}
            </div>
        `)
    }
}
