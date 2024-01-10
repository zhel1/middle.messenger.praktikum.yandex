import Block, {IProps} from "../../core/Block";
export interface ISignInPageProps extends IProps {
    onSignIn : (event:Event) => void
}
export class SignInPage extends Block {
    constructor() {
        const props : ISignInPageProps = {
            events:{},
            onSignIn: (event:Event) => {
                 event.preventDefault();
                // const login =  this.refs.formLogin.refs?.login.value();
                // const password =  this.refs.formLogin.refs?.password.value();
                //
                // console.log({
                //     login,
                //     password
                // })
                console.log("input form log")
            }
        }

        super(props);
    }
    protected render(): string {
       // const onLogin=this.props.onLogin as ISignInPageProps
        const children: string = `
            {{{ InputAuth label='Login' name='login' type='text'}}}
            {{{ InputAuth label='Password' error='wrong password' name='password' type='password'}}}`
        return(`
            <div class="signin-container">
                {{{ FormAuth caption="Sign in" textOk="Sign in" pageOk="messenger" textCancel="Sign up" pageCancel="signup"  onClickOkButton=onSignIn  children="${children}" }}}
            </div>
        `)
    }
}
