import Block, {IProps} from "../../core/Block";

interface IChangeAvatarWgtProps extends IProps {
    opened: boolean
    onSave: () => void
    onCancel: () => void
}

export class ChangeAvatarWgt extends Block<IChangeAvatarWgtProps> {
    constructor(props : IChangeAvatarWgtProps) {
        const newProps : IChangeAvatarWgtProps = {
            ...props,
            onSave: () =>  { this.onSave() },
            onCancel: () => { this.onCancel() },
        }

        super(newProps);
    }

    public get props() {
        return this._props as IChangeAvatarWgtProps;
    }

    private onCancel() {
        this.setProps({opened: false});
    }

    private onSave() {
        // updateAvatar(data)
        //     .then(() => this.onCancel())
        //     .catch((error) => console.warn('change password:', error));
    }

    protected render(): string {
        const { opened} = this._props
        return(`
            <form class="change-avatar-wgt${opened ? '' : ' hide'}">
                                      
                {{{ Button 
                    type='secondary'
                    label='Cancel'
                    onClick=onCancel
                    }}}
                    
                {{{ Button 
                    type='primary'
                    label='Save'
                    onClick=onSave
                    }}}
            </form>
        `)
    }
}
