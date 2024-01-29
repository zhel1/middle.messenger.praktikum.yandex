import Block, {IProps} from "../../core/Block";

export interface IError500PageProps extends IProps {
    error: number,
    errorText: string,
    message: string,
}

export class Error500Page extends Block<IError500PageProps> {
    constructor() {
        const props : IError500PageProps = {
            error: 500,
            errorText: "Oops! Internal Server Error",
            message: "The server encountered an internal error or misconfiguration and was unable to complete your request.",
        }
        super(props);
    }

    protected render(): string {
        return(`
            <div class="error-container">
                {{{ Error error=error errorText=errorText message=message }}}
            </div>
        `)
    }
}
