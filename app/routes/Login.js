import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';
import Icon from '/app/components/Icon.js';
import TextField from '/app/components/TextField.js';

// https://codepen.io/tayfunerbilen/pen/qMKxeQ

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    constructor() {
        super();
    }

    styleContainer = {
        backgroundColor: 'var(--theme-frontground)',
        borderRadius: '8px',
        overflow: 'hidden',
    }

    styleTitle = {
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '900',
    }

    styleSubtitle = {
        textAlign: 'center',
        margin: '0px 0px 16px',
        fontSize: '18px',
        fontWeight: '450',
    }

    styleImageContainer = {
        color: 'black',
        backgroundColor: 'white',
        padding: '16px',
    }

    styleFormContainer = {
        padding: '16px 16px 16px'
    }

    styleAlert = {
        float: "left",
        marginRight: ".3em",
    }

    styleError = {
        padding: ".7em .7em"
    }

    styleHide = {
        visibility: "hidden",
        display: "none"
    }

    styleVisible = {
        visibility: 'visible',
        display: 'block',
    }

    styleConnection = {
        backgroundColor: 'var(--theme-background-alt)',
        color: 'var(--theme-foreground)',
        padding: '16px 16px',
        marginBottom: '16px',
        borderRadius: '8px',
    }

    styleLoginButton = {
        backgroundColor: 'var(--theme-accent)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        margin: '0px 8px',
    }

    styleRegisterButton = {
        padding: '8px 16px',
        borderRadius: '8px',
        margin: '0px 8px',
    }

    doLogin = () => {
        console.log("TODO: login " + this.state.username + " " + this.state.password);
        fetch("/api/query-login.php?userName=" + this.state.username
            + "&password=" + this.state.password)
            .then(function (response) {
                return response.json()
            })
            .then(login => {
                if (login !== false)
                    route("/profile/" + login)
                else
                    document.getElementById('alertInfo').style = this.styleVisible;

            });
    }

    doRegistration = () => {
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
        <div class="magic-container">
            <div class="magic-card">
                <div style=${this.styleImageContainer}>
                    <h1 style=${this.styleTitle}>Faceter.</h1>
                    <img src='/res/login.svg'/>
                </div>
                <form style=${this.styleFormContainer} onSubmit=${this.onSubmit}>
                    <div class="ui-widget" style=${this.styleHide} id="alertInfo">
                        <div class="ui-state-error ui-corner-all" style=${this.styleError}>
                            <p>
                                <span style=${this.styleAlert}>
                                    <${Icon} icon="warning"/>
                                </span>
                                Nom/e-mail ou mot de passe incorect
                            </p>
                        </div>
                    </div>

                    <div style=${this.styleSubtitle}>
                        Connectez vous avec votre compte!
                    </div>

                    <div style="padding:0px 48px 32px">
                        <${TextField} label="E-mail ou pseudo" value=${this.state.username} onInput=${this.onUsernameInput}/>
                        <${TextField} label="Mot de passe"  value=${this.state.password} onInput=${this.onPasswordInput} password=true/>
                        <input type="checkbox" id="rememberMe"/>
                        <label for="rememberMe"> Se souvenir de moi</label>
                    </div>

                    <div style="display: flex; justify-content: center;">
                        <button style=${this.styleRegisterButton} onClick=${this.doRegistration}>S’inscrire</button>
                        <button style=${this.styleLoginButton} onClick=${this.doLogin}>Se connecter</button>
                    </div>
                </form>
            </div>
        </div>`;
    }
}

export { Login as default };
