import Block from "../../core/Block";

export class Navigator extends Block {
    constructor() {
        super({});
    }

    protected render(): string {
        return (`
            <nav class="navigator">
                <ul>
                    <li>{{{ Button label="Sign In" type="link" page="signin"}}}</li>
                    <li>{{{ Button label="Sign Up" type="link" page="signup"}}}</li>
                    <li>{{{ Button label="Messenger" type="link" page="messenger"}}}</li>
                    <li>{{{ Button label="404" type="link" page="404"}}}</li>
                    <li>{{{ Button label="500" type="link" page="500"}}}</li>
                    <li>{{{ Button label="profile" type="link" page="profile"}}}</li>
                </ul>
            </nav>
        `)
    }
}
