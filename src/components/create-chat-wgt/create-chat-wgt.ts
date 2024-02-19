import Block, {IProps, RefsType} from "../../core/Block";
import * as validators from "../../utils/validators";
import {InputConf} from "../index.ts";
import {createChat, getChats} from "../../services/chats.ts";
import ModalManager from "../../core/dialog-menedger.ts";

interface ICreateChatWgtProps extends IProps {
    validate?: object
    onAdd?: (event: Event) => void
    onCancel?: (event: Event) => void
}

type Ref = {
    title: InputConf
} & RefsType

export class CreateChatWgt extends Block<ICreateChatWgtProps, Ref> {
    constructor(props : ICreateChatWgtProps) {
        const newProps : ICreateChatWgtProps = {
            ...props,
            validate: {
                title: validators.validateName
            },
            onAdd: (event: Event) =>  { this.onAdd(event) },
            onCancel: (event: Event) => { this.onCancel(event) },
        }

        super(newProps);
    }

    private onCancel(event: Event) {
        event.preventDefault()
        ModalManager.getInstance().closeModal()
    }

    private onAdd(event: Event) {
        event.preventDefault()
        const title = this.refs.title.value()

        if (title !== null) {
            createChat(title)
                .then(() => {
                    getChats({})
                        .then()
                        .catch((error) => console.warn('create chat:', error));
                })
                .catch((error) => {
                    this.refs.title.setProps({error: true, errorText: error})
                    console.log('create chat:', error)
                });
        }
    }

    protected render(): string {
        return(`
            <form class="create-chat-wgt">
                <h1>Create chat</h1>
                   
                {{{ InputMsg 
                    label="Title"
                    type="text"
                    name="title"
                    value=''
                    editable=true
                    validate=validate.title
                    placeholder="chat title..."
                    ref='title'}}}
                    
                {{{ Button 
                    type='secondary'
                    label='Cancel'
                    onClick=onCancel
                    }}}
                    
                {{{ Button 
                    type='primary'
                    label='Add'
                    onClick=onAdd
                    }}}
            </form>
        `)
    }
}
