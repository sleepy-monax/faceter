import { Component } from '/lib/preact.js';

class Icon extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`<span class="material-icons">${this.props.icon}</span>`;
    }
}

export { Icon as default };
