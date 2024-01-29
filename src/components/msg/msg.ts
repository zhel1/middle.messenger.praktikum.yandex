import Block, {IProps} from "../../core/Block";

interface IMsgProps extends IProps {
    chat: object
    onClick: (chatID: number) => void
}

export class Msg extends Block<IMsgProps> {
    constructor(props: IMsgProps) {
        super(props);
    }

    protected render(): string {
        return (`
            <li class="msg {{#if myMessage}}my-msg{{/if}}">
                {{#with msg}}
                    {{#if file}}
                        <article class="msg__file">
                            <p>{{content}}</p>
                            <img src={{file.path}} alt="included_file"/>
                            <div class="msg__time">
                                <span>{{time}}</span>
                            </div>
                        </article>
                    {{else}}
                        <article class="msg__text">
                            <p>{{content}}</p>
                            <div class="msg__time">
                                <span>{{time}}</span>
                            </div>
                        </article>
                    {{/if}}
                {{/with}}
            </li>
        `)
    }
}

