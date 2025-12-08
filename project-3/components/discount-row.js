class DiscountRow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                div {
                    display: flex;
                    container: discount-row / inline-size;
                    max-width: 750px;
                    margin: auto;
                }
            </style>
            <div><slot></slot></div>
        `;
    }
}
customElements.define("ryug-discount-row", DiscountRow);
