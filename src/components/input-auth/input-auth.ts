import Block, {IProps, RefsType} from "../../core/Block";
import Input from "../input";

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

type Ref = {
    input: Input,
} & RefsType

export class InputAuth extends Block<IInputAuthProps, Ref> {
    constructor(props:IInputAuthProps) {
        props.errorText = '';
        props.error = false;
        props.onBlur = () => this.validate();

        super(props);
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
