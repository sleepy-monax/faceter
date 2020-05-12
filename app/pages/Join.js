import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';
import Alert from '/app/components/Alert.js';
import TextField from '/app/components/TextField.js';
import { getRandomUsername } from '/app/model/Utils.js';
import * as Style from '/app/model/Style.js';

function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    } else {
        return (false);
    }
}

class Join extends Component {
    state = {
        username: getRandomUsername(),
        email: '',
        password: '',
        verification: '',
        message: '',
    }

    constructor() {
        super();
    }

    doBack = e => {
        route("/login");
    }

    doJoin = e => {
        if (!validateEmail(this.state.email)) {
            alert("Veuillez entrer une adresse mail valide");
        } 

        if (this.state.username == "" ||
            this.state.password == "" ||
            this.state.email == "" ||
            this.state.verification == "") {
            this.setState({ message: 'Veuillez remplir tout les champs' });
            return;
        }

        if (this.state.password != this.state.verification) {
            this.setState({ message: 'Les mots de passe ne correspondent pas' });
            return;
        }


        fetch("/api/query-registration.php?username=" + this.state.username + "&password=" + this.state.password + "&email=" + this.state.email)
            .then(function (response) { return response.json() })
            .then(registration => {
                if (registration != false)
                    route("/login")
                else
                    this.setState({ message: 'Pseudo ou adresse mail déja utilisés' });
            });
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        return html`
        <div class="magic-container magic-spacer">
            <div class="magic-card">
                <div style=${Style.Illustration}>
                    <h1 style=${Style.Title}>Faceter.</h1>
                    <img style="padding-top: 16px" src='/res/join.svg'/>
                </div>

                <form style=${Style.Padding16}  onSubmit=${this.onSubmit}>
                    <h1 style=${Style.SubTitle}>Créez votre propre compte!</h1>

                    <${Alert} message=${this.state.message}/>

                    <div style="padding:0px 48px 16px">
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
                        <button style=${Style.Link} onClick=${this.doBack}>Retour</button>
                        <button style=${Style.Button}  onClick=${this.doJoin}>S’inscrire</button>
                    </div>
                </form>
            </div>
        </div>`;
    }
}

export { Join as default };
