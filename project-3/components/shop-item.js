class ShopItem extends HTMLTableRowElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const title = this.getAttribute("title");
        const description = this.getAttribute("description");
        const condition = this.getAttribute("condition");
        const price = this.getAttribute("price");
        this.innerHTML = `
            <style>
                .shop-item {
                    padding: .5rem 1rem;
                    min-width: 200px;
                }
                .shop-item-title {
                    width: 30%;
                }
                .shop-item-description {
                    width: 50%;
                }
                .shop-item-condition {
                    width: 15%;
                }
                .shop-item-price {
                    width: 5%;
                    min-width: 50px;
                }
                tr {
                    border-bottom: 1px solid var(--border-1);
                }
                tr:last-child {
                    border: none;
                }
            </style>
            <td class="shop-item shop-item-title">${title}</td>
            <td class="shop-item shop-item-description">${description}</td>
            <td class="shop-item shop-item-condition">${condition}</td>
            <td class="shop-item shop-item-price">${price}</td>
        `;
    }
}
customElements.define("ryug-shop-item", ShopItem, {extends: "tr"});
