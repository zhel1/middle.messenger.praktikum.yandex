import Block, {IProps} from "../../core/Block";
import {addActive, loadNewFileFromDrag, removeActive} from "../../utils/api.utils.ts";
import {updateAvatar} from "../../services/users.ts";
import {updateChatAvatar} from "../../services/chats.ts";

interface IChangeAvatarWgtProps extends IProps {
    mode: 'user' | 'chat'
    oldAvatar?: string | undefined
    newAvatar?: string | undefined
    onCancel?: (event: Event) => void
    close?: () => void
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
            if (this._props.mode === 'user') {
                updateAvatar(formData)
                    .then(() => this.close())
                    .catch((error) => console.warn('change user avatar:', error));
            } else if (this._props.mode === 'chat') {
                const currentChatID = window.store.getState().currentChatID
                if (currentChatID) {
                    updateChatAvatar(formData, currentChatID)
                        .then(() => this.close())
                        .catch((error) => console.warn('change chat avatar:', error));
                }
            }
        }
    }

    private close() {
        if (this._props.close) {
            this._props.close()
        }
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
