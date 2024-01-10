import Block, {IProps} from "../../core/Block";

interface IInputProps extends IProps {
    placeholder: string,
    ref:string,
    name:string,
    value:string
    label:string
    type:string
    error:boolean
    errorText: string,
}

export class InputAuth extends Block {
    constructor(props:IInputProps) {
        super({
            ...props,
            events : {
                change: (evt) => console.log(evt.target.value)
            }
        });
    }

    protected render(): string {
        const {
            placeholder,
            ref,
            name,
            value,
            label,
            type,
            error,
            errorText
        } = this.props as IInputProps;

        return (`
            <label class="input-auth ${error? "input-auth__error" : ""}" >
                <span class="input-auth__label">${label}</span>
                <input
                    class="input-auth__element"
                    placeholder="${placeholder || ''}"
                    type="${type}"
                    value="${value}"
                    name="${name}"
                    ref="${ref}"
                />
                <span class="input-auth__text-error">${errorText}</span>
            </label>
        `)
    }
}
