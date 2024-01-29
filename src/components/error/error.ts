import Block, {IProps} from "../../core/Block";

interface IErrorProps extends IProps {
    error: number,
    errorText: string,
    message: string,
}

export class Error extends Block<IErrorProps> {
    constructor(props: IErrorProps) {
        super(props);
    }

    protected render(): string {
        const {
            error,
            errorText,
            message
        } = this._props;

        return (`
            <div class="error">
                <h1>${error}</h1>
                <h2>${errorText}</h2>
                <p>${message}</p>
                <a href="#">Go To Homepage</a>
            </div>
        `)
    }
}
