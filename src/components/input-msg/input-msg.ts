import Block, {IProps} from "../../core/Block";
import Input from "../input";
import {RefsType} from "../../core/Block.ts";

export interface IInputMsgProps extends IProps {
    placeholder: string
    name:string
    value:string
    type:string
    onInput: () => void
}

type Ref = {
    input: Input
} & RefsType

export class InputMsg extends Block<IInputMsgProps, Ref> {
    constructor(props:IInputMsgProps) {
        super({
            ...props,
        });
    }

    public value() {
        return this.refs.input.value()
    }

    public setValue(value: string) {
        this.refs.input.setValue(value)
    }

    protected render(): string {
        const {
            placeholder,
            name,
            value,
            type
        } = this._props;

        return (`            
            <label class="input">
                {{{ Input 
                    classes="input__element" 
                    name="${name}"
                    value="${value || ''}"
                    type="${type}" 
                    placeholder="${placeholder || ''}"
                    onInput=onInput
                    onEnter=onEnter
                    ref="input"
                }}}
            </label>
        `)
    }
}
