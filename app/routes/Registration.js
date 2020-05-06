import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';

class Registration extends Component {
    state = {
        username: 'User',
        password: 'mathieu123',
        email: 'faceter@faceter.com',
    }

    constructor() {
        super();
    }

    doBack = e => {
        route("/login");
    }

    doRegistration = e => {
        fetch("/api/query-registration.php?username=" + this.state.username + "&password=" + this.state.password + "&email=" + this.state.email)
        .then(function (response) { return response.json()})
        .then(registration => {
            if (login != false) {
                alert("Félicitations, vous êtes maintenant inscrit");
                route("/");
            }
            else
                alert("Identifiant ou adresse mail déja utilisés")
        })
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

    onEmailInput = e => {
        let email = e.target.value;
        this.setState({ email })
    }

    render() {
        return html`
        <div>
            <form onSubmit=${this.onSubmit}>
                <h1>Inscription</h1>
                <div>
                    Pseudo :
                    <input type="text" id="username" name="username" value=${this.state.username} onInput=${this.onUsernameInput} />
                </div>
                <div>
                    Mot de passe :
                    <input type="text" id="password" name="password" value=${this.state.password} onInput=${this.onPasswordInput} />
                </div>
                <div>
                    Adresse mail :
                    <input type="text" id="email" name="email" value=${this.state.email} onInput=${this.onEmailInput} />
                </div>
                <div>
                    <button onClick=${this.doRegistration}>S’inscrire</button>
                    <button onClick=${this.doBack}>Retour</button>
                </div>
            </form>
        </div>`;
    }
}

export { Registration as default };
