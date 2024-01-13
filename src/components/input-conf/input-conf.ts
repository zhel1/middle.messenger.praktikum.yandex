import Block, {IProps} from "../../core/Block";

interface IInputConfProps extends IProps {
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

export class InputConf extends Block {
    constructor(props:IInputConfProps) {
        props.errorText = '';
        props.error = false;
        props.onBlur = () => this.validate();

        super({
            ...props,
        });
    }

    public value() {
        if (!this.validate()) {
            return null;
        }

        return (this.refs.input.element as HTMLInputElement).value
    }

    public get props() {
        return this._props as IInputConfProps;
    }

    private validate() {
        const value = (this.refs.input.element as HTMLInputElement).value
        const error = this.props.validate?.(value);
        this.props.value = value;
        if (error) {
            this.props.error = true;
            this.props.errorText = error;
            this.setProps(this.props);
            return false;
        }
        this.props.error = false;
        this.props.errorText = '';
        this.setProps(this.props);
        return true;
    }

    protected render(): string {
        const {
            placeholder,
            name,
            value,
            label,
            type,
            error
        } = this.props as IInputConfProps;

        return (`            
            <label class="input-conf ${error? "input-conf-error" : ""}">
                <div class="input-conf__label"><span>${label}</span></div>
                {{#if editable}}
                    {{{ Input 
                        classes="input-conf__value input-conf__value-editable"  
                        name="${name}"
                        value='${value}'
                        type="${type}" 
                        placeholder="${placeholder || ''}" 
                        onBlur=onBlur
                        ref="input"
                    }}}
                {{^}}
                    <span class="input-conf__value">${value}</span>
                {{/if}}
            </label>
        `)
    }
}
