import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';

class Login extends Component {
    state = {
        username: 'pomme',
        password: 'poire',
    }

    constructor() {
        super();
    }

    doLogin = e => {
        alert("TODO: login " + this.state.username + " " + this.state.password);
        route("/");
    }

    doRegistration = e => {
        alert("TODO: registration");
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onUsernameInput = e => {
        const { username } = e.target;
        this.setState({ username })
    }

    onPasswordInput = e => {
        const { password } = e.target;
        this.setState({ password })
    }

    render() {
        return html`
        <div>
            <form onSubmit=${this.onSubmit}>
                <h1>Connection</h1>
                <div>
                    E-mail ou pseudo
                    <input type="text" value=${this.state.username} onInput=${this.onUsernameInput} />
                </div>
                <div>
                    Mot de passe
                    <input type="text" value=${this.state.password} onInput=${this.onPasswordInput} />
                </div>
                <div>
                    <button onClick=${this.doRegistration}>S’inscrire</button>
                    <button onClick=${this.doLogin}>Se connecter</button>
                </div>
            </form>
        </div>`;
    }
}

export { Login as default };
