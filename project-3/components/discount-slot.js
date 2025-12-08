let gotDiscount = sessionStorage.getItem("got-discount") === "true";
const discount = sessionStorage.getItem("discound");
class DiscountSlot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.handleClick = this.handleClick.bind(this);
    }
    connectedCallback() {
        const pennySRC = new URL("../images/penny.png", import.meta.url);
        if (gotDiscount) {
            this.shadowRoot.innerHTML = `
            `;
        } else {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                    }
                    div {
                        aspect-ratio: 1/1;
                        width: calc(33.33cqw - 2rem);
                        /*background: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});*/
                        cursor: pointer;
                        padding: 1rem;
                        border: 1px solid var(--border-1);
                    }
                    div:hover img {
                        scale: 1.08;
                        opacity: .5;
                    }
                    img {
                        width: 100%;
                        aspect-ratio: 1/1;
                        object-fit: contain;
                        object-position: center;
                        transition: .1s;
                    }
                </style>
                <div class="discount-item">
                    <img alt="Penny" src="${pennySRC}">
                </div>
            `;
        }
        const tile = this.shadowRoot.querySelector(".discount-item");
        if (!gotDiscount && tile) {
            tile.addEventListener("click", this.handleClick);
        }
    }

    disconnectedCallback() {
        const tile = this.shadowRoot.querySelector(".discount-item");
        if (tile) {
            tile.removeEventListener("click", this.handleClick);
        }
    }

    lock() {
        gotDiscount = true;
        sessionStorage.setItem("got-discount", "true");
        const tile = this.shadowRoot.querySelector(".discount-item");
        if (!tile) return;
        tile.style.display = "none";
    }

    handleClick(_event) {
        if (gotDiscount) return;
        const discounts = ["5%", "10%", "20%", "50%"];
        const discount = discounts[Math.floor(Math.random() * discounts.length)];
        sessionStorage.setItem("discount", discount);

        this.lock();
        this.dispatchEvent(
            new CustomEvent("discount-claimed", {
                detail: { discount },
                bubbles: true,
                composed: true,
            }),
        );
    }
}
customElements.define("ryug-discount-slot", DiscountSlot);
