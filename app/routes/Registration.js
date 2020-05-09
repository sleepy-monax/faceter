import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';
import Icon from '/app/components/Icon.js';
import TextField from '/app/components/TextField.js';

class Registration extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        verification: '',
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

    styleRegisterButton = {
        backgroundColor: 'var(--theme-accent)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        margin: '0px 8px',
    }

    styleBackButton = {
        padding: '8px 16px',
        borderRadius: '8px',
        margin: '0px 8px',
    }

    doBack = e => {
        route("/login");
    }

    doRegistration = e => {
        if (this.state.username == "" || this.state.password == "" || this.state.email == "" || this.state.verification == "") {
            alert ("Veuillez remplir tout les champs");
        } else {
        fetch("/api/query-registration.php?username=" + this.state.username + "&password=" + this.state.password + "&email=" + this.state.email)
            .then(function (response) { return response.json() })
            .then(registration => {
                if (registration != false)
                    route("/login")
                else
                    document.getElementById('alertInfo').style = this.styleVisible;
            });
    }
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        return html`
        <div class="magic-container">
            <div class="magic-card">
                <div style=${this.styleImageContainer}>
                    <h1 style=${this.styleTitle}>Faceter.</h1>
                    <img style="padding-top: 16px" src='/res/join.svg'/>
                </div>

                <form style=${this.styleFormContainer}  onSubmit=${this.onSubmit}>
                    <h1 style=${this.styleSubtitle}>Créez votre propre compte!</h1>

                    <div class="ui-widget" style=${this.styleHide} id="alertInfo">
                        <div class="ui-state-error ui-corner-all" style=${this.styleError}>
                            <p>
                                <span class="ui-icon ui-icon-alert" style=${this.styleAlert}></span>
                                <strong>Alert : </strong>
                                "Pseudo ou adresse mail déja utilisés"
                            </p>
                        </div>
                    </div>

                    <div style="padding:0px 48px 32px">
                        <${TextField}
                            label="Pseudo"  
                            value=${this.state.username}
                            onValueChange=${(username) => this.setState({ username })}/>

                        <${TextField}
                            label="E-mail"
                            value=${this.state.email}
                            onValueChange=${(email) => this.setState({ email })}/>

                        <${TextField}
                            label="Mot de passe"
                            password=true
                            value=${this.state.password}
                            onValueChange=${(password) => this.setState({ password })}/>

                        <${TextField}
                            label="Vérification"
                            password=true
                            value=${this.state.verification}
                            onValueChange=${(verification) => this.setState({ verification })}/>
                    </div>

                    <div style="display: flex; justify-content: center;">
                        <button style=${this.styleBackButton} onClick=${this.doBack}>Retour</button>
                        <button style=${this.styleRegisterButton}  onClick=${this.doRegistration}>S’inscrire</button>
                    </div>
                </form>
            </div>
        </div>`;
    }
}

export { Registration as default };
