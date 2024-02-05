import Block, {IProps} from "../../core/Block";
import {IUser} from "../../models/IUser.ts";
import {RESOURCES_HOST} from "../../core/config";

interface IAvatarProps extends IProps {
    editable: boolean
    user: IUser
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
        const { editable, user } = this._props
        return (`
            <div class='avatar'>
                ${user?.avatar ? `
                    <img class="avatar__image" src=${RESOURCES_HOST + user.avatar} alt="avatar image">
                `:`
                    <div class="avatar__symbol" style="background: linear-gradient(135deg, {{colorByStr '${user?.first_name}' }} 0%, {{colorByStr '${user?.second_name}' }} 96.52%);">
                        {{firstLetter '${user?.first_name}' }}{{ firstLetter '${user?.second_name}' }}
                    </div>
                `}
                ${editable ? `<div class="avatar__mask"></div>`:''}
            </div>
        `)
    }
}
