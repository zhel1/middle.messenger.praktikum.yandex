import Block, {IProps} from "../../core/Block";

interface IMsgListProps extends IProps {

}

export class MsgList extends Block<IMsgListProps> {
    constructor(props: IMsgListProps) {
        super(props);
    }

    protected render(): string {
        return (`
            <div class="message-list">
                <ul class="message-list__main">
                    {{#each msgList as |message|}}
                        <div class="message-list__main__message">
                            {{{ Msg message=message }}}
                        </div>
                    {{/each}}
                     <li class="scroll-bottom"></li> 
                </ul>
            </div>
        `)
    }
}
