import Block, {IProps} from "../../core/Block";

interface IButtonProps extends IProps {
    type: 'primary' | 'secondary' | 'settings' | 'sendmsg',
    label: string,
    onClick?: () => void,
}

export class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick || (() => {})
            }
        })
    }

    protected render(): string {
        const { type, label } = this._props;
        return (`
            <button class="button button__${type}">
                ${label? label : ''}
            </button>
        `)
    }
}
