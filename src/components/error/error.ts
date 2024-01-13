import Block, {IProps} from "../../core/Block";

interface IErrorProps extends IProps{
    error: number,
    errorText: string,
    message: string,
}

export class Error extends Block {
    constructor(props: IErrorProps) {
        super(props);
    }
    protected render(): string {
        const {
            error,
            errorText,
            message
        } = this._props as IErrorProps;

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