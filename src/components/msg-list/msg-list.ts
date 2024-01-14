import Block, {IProps} from "../../core/Block";

interface IMsgListProps extends IProps{

}

export class MsgList extends Block {
    constructor(props: IMsgListProps) {
        super(props);
    }
    protected render(): string {
        return (`
            <div class="message-list">
                <ul class="message-list__main">
                    {{#each msgList as |msg|}}
                        <div class="message-list__main__message">
                            {{{ Msg msg=msg myMessage=msg.main }}}
                        </div>
                    {{/each}}
                </ul>
            </div>
        `)
    }
}
