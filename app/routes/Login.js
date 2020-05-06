import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    constructor() {
        super();
    }

    doLogin = e => {
        console.log("TODO: login " + this.state.username + " " + this.state.password);
        fetch("/api/query-login.php?userName=" + this.state.username
            + "&password=" + this.state.password)
            .then(function (response) { return response.json()})
            .then(login => {
                if (login != false)
                    route("/profile/" + login)
                else
                    alert("ERROR")

            });
    }

    doRegistration = e => {
        route("/registration");
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onUsernameInput = e => {
        let username = e.target.value;
        this.setState({ username })
    }

    onPasswordInput = e => {
        let password = e.target.value;
        this.setState({ password })
    }

    render() {
        return html`
        <div>
            <form onSubmit=${this.onSubmit}>
                <h1>Connection</h1>
                <div>
                    E-mail ou pseudo :
                    <input type="text" value=${this.state.username} onInput=${this.onUsernameInput} />
                </div>
                <div>
                    Mot de passe :
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
