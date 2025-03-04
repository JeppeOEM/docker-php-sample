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
            /* removed background-color: #000; */
          }
          dd a:hover:before, dd a:active:before {
            content: "► ";
            color: #c60;
          }
	dd a {
		  color: #0aa;
		text-decoration: none;
	  }
          dd a:hover, dd a:active {
            color: #fff!important;
            background-color: #0aa;
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
			this.linkElement.href = href;
			this.linkElement.textContent = text;
		}

		static get observedAttributes() {
			return ['href', 'text'];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (!this.linkElement) return;
			if (name === 'href') {
				this.linkElement.href = newValue;
			}
			if (name === 'text') {
				this.linkElement.textContent = newValue;
			}
		}
	}
);
