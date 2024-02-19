import Block, {IProps} from "./Block";
import ModalManager from "./dialog-menedger";

class Route {
    private _pathname: string;
    private readonly _blockClass: typeof Block;
    private _block: Block<object> | null = null;
    private readonly _props: IProps;
    private _modalClass: typeof Block | null;

    constructor(pathname: string, view: typeof Block, props: object, modal: typeof Block | null) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._modalClass = modal
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public get pathname() {
        return this._pathname
    }

    public leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    public match(pathname: string) {
        return pathname === this._pathname;
    }

    public render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            this.render();
            return;
        }

        this._block.show();

        if (this._modalClass) {
            ModalManager.getInstance().setModal(new this._modalClass() as unknown as Block<object>);
            ModalManager.getInstance().openModal();
        }
    }
}

export default Route;
