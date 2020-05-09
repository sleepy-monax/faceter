import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';
import TextField from '/app/components/TextField.js';
import Icon from '/app/components/Icon.js';
import { login } from '/app/model/Session.js';


class Login extends Component {
    state = {
        username: 'nicolas',
        password: '123456789',
        message: '',
    }

    constructor() {
        super();
    }

    styleTitle = {
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '900',
    }

    styleAlert = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--theme-alert-background)',
        color: 'var(--theme-alert-foreground)',
        border: '1px solid var(--theme-alert-border)',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '24px',
        marginLeft: '48px',
        marginRight: '48px',
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
        login(
            this.state.username,
            this.state.password,
            () => {
                route("/feed");
            },
            message => {
                this.setState({ message });
            }
        )
    }

    onSubmit = e => {
        e.preventDefault();
    }

    getAlertMessage() {
        if (this.state.message) {
            return html`
                    <div style=${this.styleAlert}>
                        <${Icon} icon="error"/>
                        <span style="margin-left: 8px">${this.state.message}</span>
                    </div>`
        }
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
                    <div style=${this.styleSubtitle}>
                        Connectez vous avec votre compte!
                    </div>

                    ${this.getAlertMessage()}

                    <div style="padding:0px 48px 32px">
                        <${TextField}
                            label="E-mail ou pseudo"
                            value=${this.state.username}
                            onValueChange=${(username) => this.setState({ username })}/>

                        <${TextField}
                            label="Mot de passe"
                            password=true
                            value=${this.state.password}
                            onValueChange=${(password) => this.setState({ password })}/>

                        <input type="checkbox" id="rememberMe"/>
                        <label for="rememberMe"> Se souvenir de moi</label>
                    </div>


                    <div style="display: flex; justify-content: center;">
                        <button style=${this.styleRegisterButton} onClick=${e => route('/join')}>S’inscrire</button>
                        <button style=${this.styleLoginButton} onClick=${this.doLogin}>Se connecter</button>
                    </div>
                </form>
            </div>
        </div>`;
    }
}

export { Login as default };
