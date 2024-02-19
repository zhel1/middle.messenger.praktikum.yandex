import { expect } from "chai";
import sinon from 'sinon';
import Block, {IProps, RefsType} from "./Block";

interface Props extends IProps {
    text?: string,
}

type Ref = object & RefsType

describe('Block', () => {
    let PageClass: typeof Block<Props, Ref>;

    before(() => {
        class Page extends Block<Props, Ref> {
            constructor(props: Props) {
                super({
                    ...props
                })
            }

            protected render(): string {
                return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`
            }
        }

        PageClass = Page;
    })

    it('Должен быть корректным', () => {
        const pageComponent = new PageClass({ text: "text" } as Props);
        expect(pageComponent.getContent()).not.null;
    });

    it('Должен создать компонент с состоянием из конструктора', () => {
        const text = 'Hello'
        const pageComponent = new PageClass({ text } as Props);

        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).to.be.eq(text);

    })

    it('Компонент должен иметь реактивное поведение', () => {
        const text = 'new value'
        const pageComponent = new PageClass({text: 'Hello'} as Props);

        pageComponent.setProps({text})
        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).to.be.eq(text);

    })

    it('Компонент должен установить события на элемент', () => {
        const handlerStub = sinon.stub();
        const pageComponent = new PageClass({events: {
                click: handlerStub
            }});

        const event = new MouseEvent('click');
        pageComponent.element?.dispatchEvent(event);

        expect(handlerStub.calledOnce).to.be.true;
    })

    it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
        const clock = sinon.useFakeTimers();
        const pageComponent = new PageClass();

        const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

        const element = pageComponent.getContent();
        document.body.append(element!);
        clock.next();

        expect(spyCDM.calledOnce).to.be.true;
    })
})
