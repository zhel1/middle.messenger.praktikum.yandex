import Block from "../../core/Block";
// import { navigate } from "../../core/navigate";
interface IProps {

}
export class SignUpPage extends Block {
    constructor(props: IProps) {
        super(props);
    }
    protected render(): string {
        return(`
            <div class="signup-container">
                {{#> FormAuth caption="Sign up" ok-text="Sign up" ok-page="messenger" cancel-text="Sign in" cancel-page="signin"}}
                    {{> InputAuth label="First name" name="first_name" type="text"}}
                    {{> InputAuth label="Second Name" name="second_name" type="text"}}
                    {{> InputAuth label="Login" name="login" type="text"}}
                    {{> InputAuth label="Email" name="email" type="email"}}
                    {{> InputAuth label="Phone number" name="phone" type="tel"}}
                    {{> InputAuth label="Password" type="password" name="password" type="password"}}
                    {{> InputAuth label="Repeat password" error="password are not mached" name="password" type="password"}}
                {{/FormAuth}}
            </div>
        `)
    }
}
