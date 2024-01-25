import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";
import isEqual from "../utils/isEqual";

export interface IProps {
    events?: Record<string, (evt: EventTarget) => void>
}
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_CWUM: "flow:component-will-unmount"
    };

    public id = nanoid(6);
    protected _props: IProps;
    protected refs: Record<string, Block> = {};
    public children: Record<string, Block>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    //private _meta: { props: IProps; };

    constructor(propsWithChildren: IProps = {}) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this._props = this._makePropsProxy(props, this);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: IProps) {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {props, children};
    }

    private _addEvents() {
        const {events = {}} = this._props as { events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        const {events = {}} = this._props as { events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWUM, this._componentWillUnmount.bind(this));
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    public componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentWillUnmount() {
        this.componentWillUnmount()
        this._removeEvents();
    }

    protected componentWillUnmount() {
        this._removeEvents();
    }

    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: IProps, newProps: IProps) {
        return isEqual<IProps>(oldProps as { [index: string]: IProps }, newProps as { [index: string]: IProps });
    }

    setProps = (nextProps: IProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this._props, nextProps);
    };

    get element() {
        return this._element;
    }

    public getRefs() {
        return this.refs
    }

    private _render() {
        const fragment = this.compile(this.render(), this._props);

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    private compile(template: string, context: object) {
        const contextAndStubs = {...context, __children: [] as Array<{ component: unknown, embed(node: DocumentFragment): void }>, __refs: this.refs};

        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;
        contextAndStubs.__children?.forEach(({embed}) => {
            embed(temp.content);
        });

        Object.values(this.children).forEach((child) => {
            const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
            stub?.replaceWith(child.getContent()!);
        })

        return temp.content;
    }

    protected render(): string {
        return '';
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: { [index: string | symbol]: unknown }, self: Block) {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target}

                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }
}

export default Block;
