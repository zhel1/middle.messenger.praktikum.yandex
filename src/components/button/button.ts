import Block, {IProps} from "../../core/Block";

interface IButtonProps extends IProps {
    type: 'primary' | 'link' | 'settings' | 'sendmsg',
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

    public get props() {
        return this._props as IButtonProps;
    }

    protected render(): string {
        const { type, label, page } = this.props;
        return (`
            <button class="button button__${type}" ${ page ? `page="${page}"` : ''}>
                ${label? label : ''}
            </button>
        `)
    }
}
