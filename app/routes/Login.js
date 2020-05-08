import {Component} from '/lib/preact.js';
import {route} from '/lib/preact-router.js';
import Icon from '/app/components/Icon.js';

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    constructor() {
        super();
    }

    styleTitle = {
        textAlign: 'center'
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

    styleInput = {
        backgroundColor: "transparent",
        color: "var(--theme-foreground)",
        flexGrow: "1",
        width: "100%",
        outline: "none",
        border: "none"
    }

    styleField = {
        display: "flex",
        backgroundColor: "var(--theme-middleground)",
        height: "32px",
        marginBottom: "8px",
        marginTop: "8px",
        borderRadius: "8px",
        paddingLeft: "8px",
        overflow: "hidden"
    }

    styleIcon = {
        width: "64px",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "32px",
        userSelect: "none",
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
    }

    styleButton = {
        width: "49%"
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
        this.setState({username})
    }

    onPasswordInput = e => {
        let password = e.target.value;
        this.setState({password})
    }

    render() {
        return html`
        <div class='container'>
            <form style=${this.styleConnection} onSubmit=${this.onSubmit}>
                <h1 style=${this.styleTitle}>Connection</h1>
                <div class="ui-widget" style=${this.styleHide} id="alertInfo">
                    <div class="ui-state-error ui-corner-all" style=${this.styleError}>
                        <p>
                            <span style=${this.styleAlert}>
                                <${Icon} icon="warning"/>
                            </span>
                            <strong>Alert : </strong>
                            Nom/e-mail ou mot de passe incorect
                        </p>
                    </div>
                </div>
                <div style=${this.styleField}>
                    <span style=${this.styleIcon}>
                        <${Icon} icon="perm_identity" />
                    </span>
                    <input 
                        type="text" 
                        value=${this.state.username} 
                        onInput=${this.onUsernameInput}
                        style=${this.styleInput} 
                        placeholder="E-mail ou pseudo"
                        required
                    />
                </div>
                <div style=${this.styleField}>
                    <span style=${this.styleIcon}>
                        <${Icon} icon="lock_open" />
                    </span>
                    <input 
                        type="password" 
                        value=${this.state.password} 
                        onInput=${this.onPasswordInput} 
                        style=${this.styleInput} 
                        placeholder="Mot de passe"
                        required
                    />
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="rememberMe"/>
                    <label for="rememberMe"> Se souvenir de moi</label>
                </div>
                <div>
                    <button class="ui-button" style=${this.styleButton} onClick=${this.doRegistration}>S’inscrire</button>
                    <button class="ui-button" style=${this.styleButton} onClick=${this.doLogin}>Se connecter</button>
                </div>
            </form>
        </div>`;
    }
}

export {Login as default};
