import Block, {IProps} from "../../core/Block";

interface IAvatarProps extends IProps {

}

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super(props);
    }
    protected render(): string {
        return (`
            {{#with user}}
                {{#if avatar}}
                    <img src={{avatar}} alt="avatar image" class="avatar">
                {{^}}
                    <div class="avatar avatar--symbol"
                         style="background: linear-gradient(135deg, {{colorByStr first_name}} 0%, {{colorByStr second_name}} 96.52%);"
                    >
                        {{firstLetter first_name }}{{ firstLetter second_name}}
                    </div>
                {{/if}}
            {{/with}}
        `)
    }
}
