/**
 * Custom web component for navigation items
 * Supports animations and active state indicators
 */
customElements.define('comp-dd',
	class extends HTMLElement {
		constructor() {
			super();
			const template = document.createElement('template');
			template.innerHTML = `
        <style>
          dd {
            margin-left: 0;
            text-align: left;
          }
          dd a::before {
            content: "» ";
            color: #a00;
            transition: content 0.2s ease, color 0.3s ease;
          }
          dd a:hover:before, dd a:active:before {
            content: "► ";
            color: #c60;
          }
          dd a {
            color: #0aa;
            text-decoration: none;
            transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
            display: inline-block;
          }
          dd a:hover, dd a:active {
            color: #fff!important;
            background-color: #0aa;
            transform: scale(1.05);
          }
          dd a.active {
            font-weight: bold;
            text-decoration: underline;
          }
        </style>
        <dd>
          <a></a>
        </dd>
      `;
			const templateContent = template.content;
			this.attachShadow({ mode: 'open' }).appendChild(
				templateContent.cloneNode(true)
			);
			this.linkElement = this.shadowRoot.querySelector('a');
		}

		connectedCallback() {
			const href = this.getAttribute('href') || '#';
			const text = this.getAttribute('text') || 'Default Link';
			const page = this.getAttribute('data-page');

			this.linkElement.href = href;
			this.linkElement.textContent = text;

			// Pass data-page attribute to the link
			if (page) {
				this.linkElement.setAttribute('data-page', page);
			}

			// Pass active class if present
			if (this.hasAttribute('active')) {
				this.linkElement.classList.add('active');
			}
		}

		// Update observed attributes
		static get observedAttributes() {
			return ['href', 'text', 'data-page', 'active'];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (!this.linkElement) return;

			if (name === 'href') {
				this.linkElement.href = newValue;
			}
			if (name === 'text') {
				this.linkElement.textContent = newValue;
			}
			if (name === 'data-page') {
				this.linkElement.setAttribute('data-page', newValue);
			}
			if (name === 'active') {
				if (newValue !== null) {
					this.linkElement.classList.add('active');
				} else {
					this.linkElement.classList.remove('active');
				}
			}
		}
	}
);
