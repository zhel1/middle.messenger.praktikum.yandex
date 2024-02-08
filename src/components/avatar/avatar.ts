import Block, {IProps} from "../../core/Block";
import {RESOURCES_HOST} from "../../core/config";

interface IAvatarProps extends IProps {
    editable: boolean
    avatar?: string
    first_name?: string
    second_name?: string
    onEdit: (evt: Event) => void
}

export class Avatar extends Block<IAvatarProps> {
    constructor(props: IAvatarProps) {
        super({
            ...props,
            events: {
                click: (evt) => {
                    if (evt instanceof MouseEvent) {
                        this.onClick(evt)
                    }
                },
            }
        });
    }

    private onClick(evt: Event) {
        if (this._props.editable) {
            this._props.onEdit(evt)
        }
    }

    protected render(): string {
        const { editable, avatar, first_name, second_name } = this._props
        return (`
            <div class='avatar'>
                ${avatar ? `
                    <img class="avatar__image" src=${RESOURCES_HOST + avatar} alt="avatar image">
                `:`
                    <div class="avatar__symbol" style="background: linear-gradient(135deg, {{colorByStr '${first_name}' }} 0%, {{colorByStr '${second_name}' }} 96.52%);">
                        {{firstLetter '${first_name}' }}{{ firstLetter '${second_name}' }}
                    </div>
                `}
                ${editable ? `<div class="avatar__mask"></div>`:''}
            </div>
        `)
    }
}
