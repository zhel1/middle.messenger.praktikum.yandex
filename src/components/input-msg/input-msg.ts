import Block, {IProps} from "../../core/Block";

interface IInputMsgfProps extends IProps {
    placeholder: string
    name:string
    value:string
    type:string
    onInput: () => void
}

export class InputMsg extends Block {
    constructor(props:IInputMsgfProps) {
        super(props);
    }

    public get props() {
        return this._props as IInputMsgfProps;
    }

    public value() {
        return (this.refs.input.element as HTMLInputElement).value
    }

    public setValue(value: string) {
        (this.refs.input.element as HTMLInputElement).value = value
    }

    protected render(): string {
        const {
            placeholder,
            name,
            value,
            type
        } = this.props as IInputMsgfProps;

        return (`            
            <label class="input">
                {{{ Input 
                    classes="input__element" 
                    name="${name}"
                    value="${value || ''}"
                    type="${type}" 
                    placeholder="${placeholder || ''}"
                    onInput=onInput
                    ref="input"
                }}}
            </label>
        `)
    }
}
