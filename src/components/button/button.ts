import Block, {IProps} from "../../core/Block";

interface IButtonProps extends IProps {
    type: 'primary' | 'link',
    label: string,
    onClick?: () => void,
    page?: string
}

export class Button extends Block {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick || (() => {})
            }
        })
    }

    protected render(): string {
        const { type, label, page } = this._props as IButtonProps;
        return (`
            <button class="button button__${type}" ${ page ? `page="${page}"` : ''}>
                ${label}
            </button>
        `)
    }
}
