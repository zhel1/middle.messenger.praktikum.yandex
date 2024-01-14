import Block, {IProps} from "../../core/Block";

interface IInputAuthProps extends IProps {
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

export class InputAuth extends Block {
    constructor(props:IInputAuthProps) {
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
        return this._props as IInputAuthProps;
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
            error,
            errorText
        } = this.props as IInputAuthProps;

        return (`
            <label class="input-auth ${error? "input-auth__error" : ""}" >
                <span class="input-auth__label">${label}</span>
                {{{ Input 
                    classes="input-auth__element" 
                    name="${name}"
                    value="${value}"
                    type="${type}" 
                    placeholder="${placeholder || ''}" 
                    onBlur=onBlur
                    ref="input"
                }}}
                <span class="input-auth__text-error">${errorText}</span>
            </label>
        `)
    }
}
