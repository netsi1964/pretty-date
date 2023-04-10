class PrettyDate extends HTMLElement {
  private text: HTMLPreElement;

  static get observedAttributes() {
    return ["date", "locale", "datestyle", "showcode"];
  }
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.text = document.createElement("pre");
    shadow.appendChild(this.text);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.table({ name, oldValue, newValue });
    this.render();
  }

  render() {
    const options: any = { dateStyle: this.dateStyle };
    const formatter = new Intl.DateTimeFormat(this.locale, options);
    const formattedDate = formatter.format(this.date);
    this.text.textContent = this.showCode
      ? this.outerHTML + " "
      : "" + formattedDate;
  }

  // attributes
  set date(value: null | number | Date | string) {
    let date = new Date();
    if (value !== null) {
      const type = typeof value;
      switch (type) {
        case "string":
          const _temp = Date.parse(value as string);
          if (isNaN(_temp)) {
            console.error("invalid date " + value);
          } else {
            date = new Date(_temp);
          }
          break;
        case "object":
          date = value as unknown as Date;
          break;
        case "number":
          date = new Date(value);
          break;
        default:
          console.error(
            "Please set date to string | number | date, not supported:" +
              typeof value,
          );
          break;
      }
    }

    this.setAttribute("date", date.toISOString());
  }
  get date(): Date {
    return new Date(this.getAttribute("date"));
  }
  get locale(): string {
    return this.getAttribute("locale") || navigator.language;
  }
  get dateStyle(): string {
    return this.getAttribute("dateStyle") || "long";
  }

  set showCode(value: string | boolean) {
    this.setAttribute("showCode", value === "true" ? "true" : "false");
  }
  get showCode(): boolean {
    return Boolean(this.getAttribute("showCode"));
  }
}

// Define the new element
customElements.define("pretty-date", PrettyDate);
export default PrettyDate;
