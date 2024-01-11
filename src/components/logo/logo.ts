import Block, {IProps} from "../../core/Block";

interface ILogoProps extends IProps {

}

export class Logo extends Block {
    constructor(props: ILogoProps) {
        super(props);
    }

    protected render(): string {
        return `<div class="logo"></div>`
    }
}