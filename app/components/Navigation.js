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
    <a class="navigation-item" href="/">
        Accueil
    </a>
    <a class="navigation-item" href="/profile/2">
        Profile
    </a>
</div>`;
    }
}

export { Navigation as default };
