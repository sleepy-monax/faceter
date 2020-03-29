import { Component } from '/lib/preact.js';

class Login extends Component {

    constructor() {
        super();
    }


    render() {
        return html`
        <div>
            <h1>Connection</h1>
            <div>E-mail ou pseudo</div>
            <div>Mot de passe</div>
        </div>`;
    }
}

export { Login as default };