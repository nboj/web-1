const paths = [
    ["Home", new URL("../", import.meta.url)],
    ["Shop", new URL("../shop/", import.meta.url)],
    ["History", new URL("/project-3/history/", import.meta.url)],
    ["Discount", new URL("/project-3/discount/", import.meta.url)],
    ["Contact us", new URL("/project-3/contact/", import.meta.url)],
    ["Sign out", new URL("/project-3/sign-out/", import.meta.url)],
];
class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    connectedCallback() {
        const current = window.location.pathname;
        let items = [];
        for (let [name, path] of paths) {
            let tmp = `<li><a href="${path}" ${path == current && "class='active'"}>${name}</a></li>`;
            items.push(tmp);
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    inset: 0 auto auto 0;
                    background: white;
                    z-index: 1000;
                }

                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-inline: 1rem;
                    border-bottom: 1px solid var(--border-1);
                }

                menu {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                a {
                    text-decoration: none;
                    color: black;
                    padding: 1.5rem .5rem;
                }

                a:hover {
                    color: #0096c7;
                }

                .active {
                    color: #0096c7;
                }

                .nav-menu {
                  display: none;
                  list-style: none;
                  margin: 0;
                  padding: 0;
                  flex-direction: column;
                  gap: 0;
                  background: white;
                  position: absolute;
                  top: 100%;
                  right: 0;
                  left: 0;
                  border-bottom: 1px solid var(--border-1, #e5e7eb);
                }

                .nav-menu.open {
                  display: flex;
                  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
                }

                .nav-menu.open li {
                    padding: .5rem 1rem;

                }

                .nav-menu.open a {
                    display: inline-block;
                    width: 100%;
                    padding: 0;
                }

                .nav-menu li {
                  border-top: 1px solid var(--border-1, #e5e7eb);
                }

                .menu-toggle {
                  border: none;
                  background: transparent;
                  padding: 0.75rem;
                  cursor: pointer;
                  display: inline-flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  gap: 4px;
                }

                .menu-toggle span {
                  display: block;
                  width: 20px;
                  height: 2px;
                  background: black;
                  border-radius: 999px;
                  transition: transform 0.15s ease, opacity 0.15s ease;
                }

                .menu-toggle[aria-expanded="true"] span:nth-child(1) {
                  transform: translateY(6px) rotate(45deg);
                }
                .menu-toggle[aria-expanded="true"] span:nth-child(2) {
                  opacity: 0;
                }
                .menu-toggle[aria-expanded="true"] span:nth-child(3) {
                  transform: translateY(-6px) rotate(-45deg);
                }

                @media (min-width: 768px) {
                  nav {
                    position: relative;
                  }

                  .menu-toggle {
                    display: none;
                  }

                  .nav-menu {
                    position: static;
                    display: flex;
                    flex-direction: row;
                    border-bottom: none;
                  }

                  .nav-menu li {
                    border-top: none;
                  }

                  a {
                    padding: 1.5rem 0.5rem;
                  }
                }

            </style>
            <nav>
                <h5>RYUG</h5>
                <button
                  class="menu-toggle"
                  aria-label="Toggle navigation"
                  aria-expanded="false"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <menu class="nav-menu">
                    ${items.join(" ")}
                </menu>
            </nav>
        `;

        const btn = this.shadowRoot.querySelector(".menu-toggle");
        btn?.addEventListener("click", this.toggleMenu);
    }

    disconnectedCallback() {
        const btn = this.shadowRoot.querySelector(".menu-toggle");
        btn?.removeEventListener("click", this.toggleMenu);
    }
    toggleMenu() {
        const menu = this.shadowRoot.querySelector(".nav-menu");
        const btn = this.shadowRoot.querySelector(".menu-toggle");
        if (!menu || !btn) return;

        const isOpen = menu.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
    }
}
customElements.define("ryug-navbar", Navbar);
