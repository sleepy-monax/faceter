import { Component } from '/lib/preact.js';

class Navigation extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`
<div class="navigation">
    <a class="navigation-brand" href="/">
        Faceter.
    </a>
</div>
        `;
    }
}

export { Navigation as default };