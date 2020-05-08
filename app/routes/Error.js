import { Component } from '/lib/preact.js';

import Icon from '/app/components/Icon.js'

class Error extends Component {
    constructor() {
        super();
    }

    render() {
        return html`
        <div class="container">
            <img src="/res/error.svg"/>
            <h1>404!</h1>
            <h2>Vous vous êtes perdu ?</h2>
            <a href="/login">Revenir à l'accueil<${Icon} icon="chevron_right"/></a>
        </div>`;
    }
}

export { Error as default };
