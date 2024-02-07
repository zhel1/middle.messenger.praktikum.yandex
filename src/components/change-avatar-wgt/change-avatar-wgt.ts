import Block, {IProps} from "../../core/Block";
import {addActive, loadNewFileFromDrag, removeActive} from "../../utils/api.utils.ts";
import {updateAvatar} from "../../services/users.ts";
import modalManager from "../../core/dialog-menedger.ts";
import ProfileWgt from "../profile-wgt";

interface IChangeAvatarWgtProps extends IProps {
    oldAvatar?: string | undefined
    newAvatar?: string | undefined
    onCancel?: (event: Event) => void
}

export class ChangeAvatarWgt extends Block<IChangeAvatarWgtProps> {
    constructor(props : IChangeAvatarWgtProps) {
        const newProps : IChangeAvatarWgtProps = {
            ...props,
            events: {
                dragover: (e:Event) => { addActive(e) },
                dragleave: (e:Event) => { removeActive(e) },
                drop: (e:Event) => { this.onAddFile(e) },
                change: (e:Event) => { this.onAddFile(e) },
            },
            onCancel: (event: Event) => { this.onCancel(event) },
        }

        super(newProps);
    }

    public get props() {
        return this._props as IChangeAvatarWgtProps;
    }

    private onCancel(event: Event) {
        event.preventDefault()
        this.close()
    }

    private onAddFile(e: Event) {
        e.preventDefault()
        removeActive(e);
        const formData = loadNewFileFromDrag<typeof e>(e);
        if (formData) {
            this.props.oldAvatar = window.store.getState().user?.avatar
            updateAvatar(formData)
                .then(() => this.close())
                .catch((error) => console.warn('change avatar:', error));
        }
    }

    private close() {
        modalManager.setModal(new ProfileWgt({editable: true}) as unknown as Block<object>);
        modalManager.openModal();
    }

    protected render(): string {
        return(`
            <form class="change-avatar-wgt">
                <h2>Change avatar</h2>
                
                <img class="change-avatar-wgt__avatar" src='/assets/image_placeholder.jpg' alt="avatar image">
                    
                <label for='file-input' class='change-avatar-wgt__label'>Select image file</label>
                <input id='file-input' class='change-avatar-wgt__input' type='file' name='file' accept='.jpg, .png, .svg'>
                <span>or drop it here</span>
                
                {{{ Button 
                    type='secondary'
                    label='Cancel'
                    onClick=onCancel
                    }}}
                    
            </form>
        `)
    }
}
