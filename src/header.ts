import markup from "./header.html" with { type: "text" };

export class WsdotHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(markup, "text/html");
    shadow.innerHTML = markup;
  }
}

customElements.define("wsdot-header", WsdotHeader, {
  extends: "header",
});

export default WsdotHeader;
