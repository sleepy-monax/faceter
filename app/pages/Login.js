import { Component } from '/lib/preact.js';
import { route } from '/lib/preact-router.js';
import TextField from '/app/components/TextField.js';
import Alert from '/app/components/Alert.js';
import { login } from '/app/model/Session.js';
import * as Style from '/app/model/Style.js';

class Login extends Component {
    state = {
        username: 'Nicolas',
        password: 'Nicolas',
        message: '',
    }

    constructor() {
        super();
    }

    onSubmit = e => {
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
        e.preventDefault();
    }

    render() {
        return html`
        <div class="magic-container">
            <div class="magic-card">
                <div style=${Style.Illustration}>
                    <h1 style=${Style.Title}>Faceter.</h1>
                    <img src='/res/login.svg'/>
                </div>
                <form style=${Style.Padding16} onSubmit=${this.onSubmit}>
                    <div style=${Style.SubTitle}>
                        Connectez vous avec votre compte!
                    </div>

                    <${Alert} message=${this.state.message}/>

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
                        <button style=${Style.Link} onClick=${e => route('/join')}>S’inscrire</button>
                        <button style=${Style.Button} type="submit" >Se connecter</button>
                    </div>
                </form>
            </div>
        </div>`;
    }
}

export { Login as default };
