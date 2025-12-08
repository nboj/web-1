class TextScroller extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.togglePause = this.togglePause.bind(this);
    this._handleResize = this._handleResize.bind(this);
    // NOTE: observers: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
    this._resizeObserver = null;
    this._itemsTemplate = ""; 
  }

  connectedCallback() {
    this._itemsTemplate = this.innerHTML.trim();
    if (!this._itemsTemplate) {
      this._itemsTemplate = "<span class='item'>No text yet</span>";
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          cursor: pointer;
          user-select: none;
        }

        .wrapper {
          overflow: hidden;
          white-space: nowrap;
          padding: 0.5rem 0;
        }

        .track {
          display: inline-flex;
          gap: 2rem;
          will-change: transform;
          animation-name: scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 20s;
          --scroll-distance: 0px;
        }

        :host(.paused) .track {
          animation-play-state: paused;
        }

        .chunk {
          display: inline-flex;
          gap: 2rem;
        }

        .item {
          font-size: 0.9rem;
          color: #4b5563;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: #9ca3af;
          flex-shrink: 0;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-distance)));
          }
        }
      </style>

      <div class="wrapper">
        <div class="track"></div>
      </div>
    `;

    this.innerHTML = "";

    const wrapper = this.shadowRoot.querySelector(".wrapper");
    wrapper?.addEventListener("click", this.togglePause);
    this.populateTrack();
    const host = this;
    if ("ResizeObserver" in window) {
      this._resizeObserver = new ResizeObserver(() => this._handleResize());
      this._resizeObserver.observe(host);
    } else {
      window.addEventListener("resize", this._handleResize);
    }
  }

  disconnectedCallback() {
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    wrapper?.removeEventListener("click", this.togglePause);

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    } else {
      window.removeEventListener("resize", this._handleResize);
    }
  }

  togglePause() {
    this.classList.toggle("paused");
  }

  _handleResize() {
    this.populateTrack();
  }

  populateTrack() {
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    const track = this.shadowRoot.querySelector(".track");
    if (!wrapper || !track) return;
    track.innerHTML = "";

    const wrapperWidth = wrapper.offsetWidth || this.getBoundingClientRect().width;
    if (wrapperWidth === 0) return;

    const addChunk = () => {
      const chunk = document.createElement("div");
      chunk.className = "chunk";
      chunk.innerHTML = this._itemsTemplate;
      track.appendChild(chunk);
    };

    addChunk();
    let safety = 0;
    while (track.scrollWidth < wrapperWidth * 2 && safety < 20) {
      addChunk();
      safety++;
    }
    const scrollDistance = track.scrollWidth / 2;
    track.style.setProperty("--scroll-distance", `${scrollDistance}px`);
    const speedPixelsPerSecond = 60;
    const durationSeconds = scrollDistance / speedPixelsPerSecond;
    track.style.animationDuration = `${durationSeconds}s`;
  }
}

customElements.define("ryug-text-scroller", TextScroller);
