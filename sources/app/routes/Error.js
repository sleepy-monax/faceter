import { Component } from '/lib/preact.js';

class Error extends Component {

    constructor() {
        super();
    }


    render() {
        return html`
        <div>
            <h1>Erreur</h1>
            <h2>Vous vous êtes perdu ?</h2>
            <a href="/login">Revenir à l'accueil...</a>
        </div>`;
    }
}

export { Error as default };
