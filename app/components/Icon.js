import { Component } from '/lib/preact.js';

class Icon extends Component {

    constructor() {
        super();
    }

    render() {
        return html`<span onClick=${this.props.onClick} class="material-icons">${this.props.icon}</span>`;
    }
}

export { Icon as default };
