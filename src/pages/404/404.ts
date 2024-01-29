import Block, {IProps} from "../../core/Block";

export interface IError404PageProps extends IProps {
    error: number,
    errorText: string,
    message: string,
}

export class Error404Page extends Block<IError404PageProps> {
    constructor() {
        const props : IError404PageProps = {
            error: 404,
            errorText: "Oops! This Page Could Not Be Found",
            message: "sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable",
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
