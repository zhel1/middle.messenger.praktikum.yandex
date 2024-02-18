import Block, {IProps} from "../../core/Block";

interface IInputProps extends IProps {
    classes: string
    name:string
    value?:string
    src?:string
    type: 'text' | 'password' | 'email' | 'tel' | 'image'
    placeholder?: string
    alt?: string
    onBlur:()=>void
    onInput:()=>void
    onClick:()=>void
}

type Ref = {
    input: HTMLInputElement
}

export class Input extends Block<IInputProps, Ref> {
    constructor(props: IInputProps) {
        props.events = {
            blur: props.onBlur || (() => {}),
            input: props.onInput || (() => {}),
            click: props.onClick || (() => {}),
        };
        super(props)
    }

    public value() {
        return this.refs.input.value;
    }

    public setValue(value: string) {
        return this.refs.input.value = value
    }

    protected render(): string {
        const {
            classes,
            name,
            value,
            type,
            placeholder,
            src,
            alt
        } = this._props;

        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                name="${name}"
                value="${value}"
                type="${type}" 
                alt="${alt}"
                src="${src}"
                ref='input'
            />
        `)
    }
}
