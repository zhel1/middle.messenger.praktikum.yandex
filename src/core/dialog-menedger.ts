import Block from "./Block.ts";

class ModalManager {
    private static __instance: ModalManager;
    private dialog: HTMLDialogElement | null = null;
    private _opened: boolean = false;

    constructor() {
        if (ModalManager.__instance) {
            return ModalManager.__instance;
        }

        ModalManager.__instance = this;
        this.dialog = document.getElementById('dialog') as HTMLDialogElement;
        this._opened = false;
    }

    public static getInstance() {
        return this.__instance;
    }

    public get opened(){
        return this._opened;
    }

    public setModal(modal: Block<object>) {
        if (!this.dialog?.firstElementChild) {
            this.dialog?.append(document.createElement('div'));
        }

        const htmlElement = modal.getContent();
        if (htmlElement) {
            this.dialog?.firstElementChild?.replaceWith(htmlElement);
        }
    }

    public openModal(){
        this._opened = true;
        this.dialog?.showModal()
    }

    public closeModal(){
        this._opened = false;
        this.dialog?.close()
    }

}

const modalManager = new ModalManager();
export default modalManager;
