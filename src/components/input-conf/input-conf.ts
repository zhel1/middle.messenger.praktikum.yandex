import Block, {IProps, RefsType} from "../../core/Block";
import Input from "../input";

export interface IInputConfProps extends IProps {
    placeholder: string
    name:string
    value:string
    label:string
    type:string
    error:boolean
    errorText: string
    validate: (value: string) => string,
    onBlur: (value: string) => void
}

type Ref = {
    input: Input,
} & RefsType

export class InputConf extends Block<IInputConfProps, Ref> {
    constructor(props:IInputConfProps) {
        props.errorText = '';
        props.error = false;
        props.onBlur = () => this.validate();

        super(props)
    }

    public value() {
        if (!this.validate()) {
            return null;
        }

        return this.refs.input.value()
    }

    private validate() {
        const value = this.refs.input.value()
        const errorText = this._props.validate?.(value);

        this.setProps({
            value: value,
            error: errorText !== '',
            errorText: errorText ? errorText : ''
        });

        return errorText === '';
    }

    protected render(): string {
        const {
            placeholder,
            name,
            value,
            label,
            type,
            error,
            errorText
        } = this._props;

        return (`            
            <label class="input-conf">
                <div class="input-conf__pair ${error? "input-conf__pair-error" : ""}"">
                    <div class="input-conf__pair-label"><span>${label}</span></div>
                    {{#if editable}}
                        {{{ Input 
                            classes="input-conf__pair-value input-conf__pair-value-editable"  
                            name="${name}"
                            value='${value? value : ''}'
                            type="${type}" 
                            placeholder="${placeholder || ''}" 
                            onBlur=onBlur
                            ref="input"
                        }}}
                    {{^}}
                        <span class="input-conf__pair-value">${value? value : ''}</span>
                    {{/if}}
                </div>
                <span class="input-conf__text-error">${errorText}</span>
            </label>
        `)
    }
}
