import Block, {IProps} from "../../core/Block";
import InputMsg from "../input-msg";
import * as validators from "../../utils/validators";

interface IConversationProps extends IProps{
    onSend : (event:Event) => void
}

export class Conversation extends Block {
    constructor(props: IConversationProps) {
        props.onSend = (event:Event) => {
            event.preventDefault();

            const message = (this.refs.input as InputMsg).value()

            if (validators.validateMsg(message)) {
                console.log("bad message")
                return
            }

            (this.refs.input as InputMsg).setValue('')

            console.log({
                message
            })
        }

        super(props);
    }
    protected render(): string {
        return (`
            <div class="conversation">
                <div class="conversation__header">
                    <div class="conversation__header--user">
                        {{{ Avatar user=conversation.user}}}
                        <b>{{conversation.user.first_name}} {{conversation.user.second_name}}</b>
                    </div>
                    {{{ Button type="settings"}}}
                </div>
                <div class="conversation__scroll">
                    {{{ MsgList msgList=msg_list}}}
                </div>
                <div class="conversation__footer">
                    {{{ Button type="settings"}}}
                    {{{ InputMsg placeholder="Message..." name="message" ref='input' }}}
                    {{{ Button type="sendmsg" onClick=onSend }}}
                </div>
            </div>
        `)
    }
}
