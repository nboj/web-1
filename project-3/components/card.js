class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const title = this.getAttribute("title");
        const src = this.getAttribute("src");
        this.shadowRoot.innerHTML = `
            <style>
                :host([reverse]) {
                    flex-direction: row-reverse;
                }
                :host {
                    display: flex;
                    container: card / inline-size;
                    overflow: hidden;
                    height: fit-content;
                    padding: 1rem !important;
                    gap: 3rem;
                }
                :host >* {
                    flex-basis: 50cqw;
                }
                img {
                    object-fit: cover;
                    object-position: center;
                    aspect-ratio: 1/1;
                    width: 50cqw;
                    overflow: hidden;
                }
                div {
                    flex-shrink: 0;
                    height: fit-content;
                }

                @media (max-width: 800px) {
                    :host([reverse]) {
                        flex-direction: column;
                    }
                    :host {
                        flex-direction: column;
                        gap: 1rem;

                    }
                    img {
                        height: 50cqi;
                        width: 100%;
                    }
                }
            </style>
            <img src="${src}"/>
            <div>
                <h3>${title}</h3>
                <slot name="description"></slot>
            </div>
        `;
    }
}
customElements.define("ryug-card", Card);
