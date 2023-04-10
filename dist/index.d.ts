declare class PrettyDate extends HTMLElement {
    private text;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    render(): void;
    set date(value: null | number | Date | string);
    get date(): Date;
    get locale(): string;
    get dateStyle(): string;
    set showCode(value: string | boolean);
    get showCode(): boolean;
}
