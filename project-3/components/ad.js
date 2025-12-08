class Ad extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const variant = this.getAttribute("variant") || "sale";
        const href = this.getAttribute("href") ?? "/";

        let bg = "#ecfeff";
        let border = "#22c55e";
        let heading = "RYUG Super Sale!";
        let body =
            "Trade in your ugly gifts now and get imaginary savings you can’t actually spend.";
        let animateClass = "";

        if (variant === "warning") {
            bg = "#fef3c7";
            border = "#f59e0b";
            heading = "Warning: Ugly Gift Overflow!";
            body =
                "Recycle your questionable presents at RYUG today.";
        } else if (variant === "premium") {
            bg = "#f5f3ff";
            border = "#8b5cf6";
            heading = "Premium Regifting Experience";
            body =
                "Upgrade to RYUG Gold and unlock exclusive access to the world’s finest ugly gifts.";
            animateClass = "pulse";
        }

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              margin: 1rem 0;
            }

            .ad {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
              padding: 1rem 1.25rem;
              border-radius: 0.75rem;
              border: 1px solid ${border};
              background: ${bg};
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            .heading {
              font-weight: 700;
              font-size: 0.95rem;
            }

            .body {
              font-size: 0.85rem;
              line-height: 1.4;
            }

            .cta {
              margin-top: 0.5rem;
              font-size: 0.8rem;
              font-weight: 600;
              text-decoration: underline;
              cursor: pointer;
              color: black;
            }

            .pulse {
              animation: pulse 1.3s ease-in-out infinite;
            }

            @keyframes pulse {
              0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
              70% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(139, 92, 246, 0); }
              100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
            }
          </style>

          <aside class="ad ${animateClass}">
            <div class="heading">${heading}</div>
            <div class="body">
              <slot>
                ${body}
              </slot>
            </div>
            <a class="cta" href="${href}">Click here to recycle your ugly gift →</a>
          </aside>
    `;
    }

    static get observedAttributes() {
        return ["variant"];
    }
}

customElements.define("ryug-ad", Ad);
