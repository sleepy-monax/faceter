import { Component } from '/lib/preact.js';

class Icon extends Component {
    style = {
        fontFamily: "'Material Icons'",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: "1",
        letterSpacing: "normal",
        textTransform: "none",
        display: "inline-block",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        direction: "ltr",
        textAlign: "center",
        verticalAlign: "middle"
      }

    constructor() {
        super();
    }

    render() {
        return html`<span style=${this.style} onClick=${this.props.onClick}>${this.props.icon}</span>`;
    }
}

export { Icon as default };
