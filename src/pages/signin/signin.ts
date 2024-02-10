import Block, {IProps, RefsType} from "../../core/Block";
import {InputAuth} from "../../components";
import * as validators from '../../utils/validators';
import Router from "../../core/router.ts";
import {RoutesStrs} from "../../core/config.ts";
import {SignInInput} from "../../models/TUser";
import {signin} from "../../services/auth";

export interface ISignInPageProps extends IProps {
    validate: object
    onSignIn : (event:Event) => void
    onSignUp : (event:Event) => void
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
            onSignIn: (event: Event) => this.onSignIn(event),
            onSignUp: (event: Event) => this.onSignUp(event)
        }

        super(props);
    }

    private onSignIn(event: Event) {
        event.preventDefault();

        const login = this.refs.login.value()
        const password = this.refs.password.value()

        const data = {
            login,
            password,
        } as SignInInput;

        if (Object.values(data).findIndex(value => value === null) === -1) {
            signin(data)
                .then(() => {
                    Router.getRouter().go(RoutesStrs.messenger)
                })
                .catch((error) => console.log('signin:', error));
        }
    }

    private onSignUp(event: Event) {
        event.preventDefault();
        Router.getRouter().go(RoutesStrs.signup)
    }

    protected render(): string {
        return(`
            <div class="signin-container">
                {{#> FormAuth 
                     caption="Sign in"
                     textOk="Sign in"
                     textCancel="Sign up"
                     onClickCancelButton=onSignUp
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
