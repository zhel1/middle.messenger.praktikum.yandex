import Block, {IProps} from "../../core/Block";

interface IInputProps extends IProps {
    classes: string
    name:string
    value:string
    type: 'text' | 'password'
    placeholder: string
    onBlur:()=>void
}

export class Input extends Block {
    constructor(props: IInputProps) {
        props.events={
            blur: props.onBlur || (() => {}),
        };
        super(props)
    }

    protected render(): string {
        const {
            classes,
            name,
            value,
            type,
            placeholder
        } = this._props as IInputProps;

        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                name="${name}"
                value="${value}"
                type="${type}" 
            />
        `)
    }
}
