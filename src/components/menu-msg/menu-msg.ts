import Block, {IProps} from "../../core/Block";
interface IMenuMsgProps extends IProps {
    opened: boolean
    addFile: () => void
    addImage: () => void
    addLocation: () => void
}

export class MenuMsg extends Block<IMenuMsgProps> {
    constructor(props:IMenuMsgProps) {
        props.opened = false
        props.addFile = () => this.addFile()
        props.addImage = () => this.addImage()
        props.addLocation = () => this.addLocation()
        super(props);
    }

    public get props() {
        return this._props;
    }

    private addFile() {
        console.log("addFile")
        this.close()
    }

    private addImage() {
        console.log("addImage")
        this.close()
    }

    private addLocation() {
        console.log("addLocation")
        this.close()
    }

    private close() {
        this.setProps({opened: false})
    }

    protected render(): string {
        const { opened} = this._props
        return (`
             <ul class="menu-msg${opened ? '' : ' hide'}">
                {{{ MenuItem name='Send file' icon='file' onClick=addFile }}}
                {{{ MenuItem name='Send image' icon='image' onClick=addImage}}}
                {{{ MenuItem name='Send location' icon='location' onClick=addLocation}}}
            </ul>
        `)
    }
}
