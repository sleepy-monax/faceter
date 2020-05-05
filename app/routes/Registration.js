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
        alert("Félicitations, vous êtes maintenant inscrit");
        alert(this.state.username + " " + this.state.password + " " + this.state.email);
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
                    <input type="text" value=${this.state.username} onInput=${this.onUsernameInput} />
                </div>
                <div>
                    Mot de passe :
                    <input type="text" value=${this.state.password} onInput=${this.onPasswordInput} />
                </div>
                <div>
                    Adresse mail :
                    <input type="text" value=${this.state.email} onInput=${this.onEmailInput} />
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
