import Block, {IProps} from "../../core/Block";

interface IFormAuthProps extends IProps {
    caption: string
    children: string
    onClickOkButton: (event:Event) => void
    onClickCancelButton: (event:Event) => void
    textOk: string
    textCancel: string
    pageOk:string
    pageCancel:string
}

export class FormAuth extends Block {
    constructor(props: IFormAuthProps) {
        super(props);
    }

    protected render(): string {
        const {
            caption,
            children,
            textOk,
            textCancel,
            pageOk,
            pageCancel
        } = this.props as IFormAuthProps;
        return(`
            <form class="auth-form">
                {{{ Logo }}}
                <h1 class="auth-form__header">
                    ${caption}
                </h1>
                    ${children}
                <div class="auth-form__buttons">
                    {{{ Button label="${textOk}" page="${pageOk}" onClick=onClickOkButton type="primary"}}}    
                    {{{ Button label="${textCancel}" page="${pageCancel}" onClick=onClickCancelButton type="link" }}}
                </div>
            </form>
        `)
    }
}
