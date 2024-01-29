import Block, {IProps, RefsType} from "../../core/Block";
import {InputAuth} from "../../components";
import * as validators from '../../utils/validators';
import {navigate} from "../../core/navigate";

export interface ISignInPageProps extends IProps {
    validate: object
    onSignIn : (event:Event) => void
}

type Ref = {
    login: InputAuth
    password: InputAuth
} & RefsType

export class SignInPage extends Block<ISignInPageProps,Ref> {
    constructor() {
        const props : ISignInPageProps = {
            validate: {
                login: validators.validateLogin,
                password: validators.validatePassword
            },
            onSignIn: (event:Event) => {
                event.preventDefault();

                const login = this.refs.login.value()
                const password = this.refs.password.value()

                console.log({
                    login,
                    password
                })

                //if success
                if (login !== null && password !== null) {
                    navigate('messenger')
                }
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
