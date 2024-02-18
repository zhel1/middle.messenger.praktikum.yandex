import Block, {IProps} from "../../core/Block.ts";
import {TUser} from "../../models/TUser.ts";

export interface IUserItemProps extends IProps {
    user: TUser,
    icon: 'plus'|'delete';
    onClick?: (e: Event, user: TUser) => void;
}

export class UserItem extends Block<IUserItemProps> {
    constructor(props: IUserItemProps) {
        super({
            ...props,
            events: {
                click: ((e) => {
                    if (props.onClick && (e.target as HTMLElement).classList.contains('user-item__icon')) {
                        props.onClick(e, this.props.user)
                    }
                }),
            }
        })
    }

    public get props(){
        return this._props as IUserItemProps;
    }

    protected render(): string {
        const { icon='',user} = this.props;
        return (`
            <div class='user-item' >
                 <p  class='user-item__name'>${user.first_name + " " + user.second_name}</p>  
                <div class='user-item__icon ${`user-item__icon_` + icon}' id='${user.id || ''}'></div>
            </div>
        `)
    }
}
