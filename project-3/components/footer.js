class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const date = new Date();
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                footer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top: 1px solid var(--border-1);
                    padding: 1rem;
                }
                .title {
                    font-weight: 700;
                }
                p {
                    margin: 0;
                }
            </style>
            <footer>
                <p>
                    <span class="title">RYUG</span>
                    <span> &copy; ${date.getFullYear()}</span>
                </p>
            </footer>
        `;
    }
}
customElements.define("ryug-footer", Footer);
