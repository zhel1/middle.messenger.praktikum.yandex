import Block, {IProps} from "../../core/Block";

interface IMenuItemProps extends IProps {
    name: string
    icon: 'media' | 'file' | 'location' | 'plus' | 'delete' | 'avatar'|'danger'
    onClick: () => void
}

export class MenuItem extends Block<IMenuItemProps> {
    constructor(props:IMenuItemProps) {
        props.events = {
            click: props.onClick || (() => {})
        }
        super(props);
    }

    protected render(): string {
        const {
            name,
            icon
        } = this._props
        return (`            
            <li class="menu-item">
                <div class="menu-item__icon menu-item__icon-${icon}"></div>
                <p class="menu-item__name">${name}</p>
            </li>
        `)
    }
}
