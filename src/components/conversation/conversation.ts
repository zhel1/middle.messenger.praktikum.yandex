import Block, {IProps, RefsType} from "../../core/Block";
import InputMsg from "../input-msg";
import * as validators from "../../utils/validators";
import MenuConversation from "../menu-conversation";
import {MenuMsg} from "../index.ts";

interface IConversationProps extends IProps {
    onSend : (event:Event) => void
    onMenuConversationClick: (event:Event) => void
    onMenuMessageClick: (event:Event) => void
}

type Ref = {
    menuConversation: MenuConversation
    input: InputMsg
    menuMsg: MenuMsg
} & RefsType

export class Conversation extends Block<IConversationProps, Ref> {
    constructor(props: IConversationProps) {
        props.onMenuConversationClick = (event) => this.onMenuConversationClick(event)
        props.onMenuMessageClick = (event) => this.onMenuMessageClick(event)
        props.onSend = (event) => this.onSend(event)

        super(props);
    }

    private getMenuMsg() {
        return this.refs.menuMsg as MenuMsg
    }

    private onMenuConversationClick(event: Event) {
        event.preventDefault()
        this.refs.menuConversation.setProps({opened: !this.refs.menuConversation.props.opened});
    }
    private onMenuMessageClick(event: Event) {
        event.preventDefault()
        this.getMenuMsg().setProps({opened: !this.getMenuMsg().props.opened})
    }

    private onSend(event: Event) {
        event.preventDefault();

        const message = this.refs.input.value()
        if (validators.validateMsg(message)) {
            console.log("bad message")
            return
        }

        this.refs.input.setValue('')

        console.log({
            message
        })
    }

    protected render(): string {
        return (`
            <div class="conversation">
                <div class="conversation__header">
                    <div class="conversation__header--user">
                        {{{ Avatar user=conversation.user}}}
                        <b>{{conversation.user.first_name}} {{conversation.user.second_name}}</b>
                    </div>
                    {{{ Button type="settings" onClick=onMenuConversationClick }}}
                    {{{ MenuConversation ref='menuConversation'}}}
                </div>
                <div class="conversation__scroll">
                    {{{ MsgList msgList=msg_list}}}
                </div>
                <div class="conversation__footer">
                    {{{ Button type="settings" onClick=onMenuMessageClick }}}
                    {{{ InputMsg placeholder="Message..." name="message" ref='input' }}}
                    {{{ Button type="sendmsg" onClick=onSend }}}
                    {{{ MenuMsg ref='menuMsg' }}}
                </div>
            </div>
            
        `)
    }
}
