import Block, {IProps} from "../../core/Block";

export interface IMessengerPageProps extends IProps {
    selectedChatID?: number | null
}

export class MessengerPage extends Block<IMessengerPageProps> {
    constructor() {
        const props : IMessengerPageProps = {
        }
        super(props);
    }


    protected render(): string {
        return(`
            <div class="messenger">
                {{{ SideBar }}}
                {{{ Conversation}}}
            </div>
        `)
    }

}
