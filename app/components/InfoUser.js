import { Component } from "/lib/preact.js";
import { getSessionId } from "/app/model/Session.js";
import { getUser } from "/app/model/Users.js";
import * as Style from '/app/model/Style.js';
import { getSessionToken } from "/app/model/Session.js";
import TextField from '/app/components/TextField.js';
import { route } from '/lib/preact-router.js';


class InfoUser extends Component {

    constructor() {
        super();
    }

    styleField = {
        color: "var(--theme-foreground)",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        border: "1px solid var(--theme-border)",
        padding: "16px",
    }

    componentDidMount() {
        getUser(getSessionId(), user => {
            this.setState({ username: user.userName, email: user.userMail, password: user.userPassword })
        });
    }

    sendProfilePicture() {

        let pathProfile = document.getElementById("ProfImg").files[0];
        let formData = new FormData();

        formData.append("photo", pathProfile);
        fetch('/api/upload-profile.php?sessionToken=' + encodeURIComponent(getSessionToken()), { method: "POST", body: formData });
    }

    sendCoverPicture() {

        let pathCover = document.getElementById("CoverImg").files[0];
        let formData = new FormData();

        formData.append("photo", pathCover);
        fetch('/api/upload-cover.php?sessionToken=' + encodeURIComponent(getSessionToken()), { method: "POST", body: formData });
    }

    doModify = e => {
        e.preventDefault();
        fetch("/api/query-update-info.php?id=" + getSessionId() + "&name=" + this.state.username + "&password=" + this.state.password + "&email=" + this.state.email)
            .then(function (response) {
                return response.json()
            })
            .then(update => console.log(update))

    }

    render() {
        return html`
            <div>
                <div class="magic-card">
                    <div style=${Style.Illustration}>
                        <img src='/res/settings.svg'/>
                    </div>
                    <div style=${Style.Padding16}>
                        <div style=${Style.SubTitle}>
                                Personnalisez votre profil
                        </div>
                        <div>
                            Profil
                            <div style=${this.styleField}>
                                <input
                                    type="file" 
                                    accept="image"
                                    id="ProfImg"
                                />
                            </div>
                            <div style="display: flex; justify-content: center; margin-top: 16px;">
                                <button style=${Style.Button} onClick=${() => this.sendProfilePicture()}>Télécharger</button>
                            </div>
                        </div>
                        <div>
                            Couverture
                            <div style=${this.styleField}>
                                <input
                                    type="file"
                                    accept="image"
                                    id="CoverImg"
                                />
                            </div>
                            <div style="display: flex; justify-content: center; margin-top: 16px;">
                                <button style=${Style.Button} onClick=${() => this.sendCoverPicture()}>Télécharger</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="magic-spacer"></div>
                <div class="magic-card">
                    <form style=${Style.Padding16} onsubmit=${this.doModify}>
                        <div style=${Style.SubTitle}>
                            Changez vos informations personnelles
                        </div>
                        <span>
                            <${TextField}
                                label="Pseudo"
                                value=${this.state.username}
                                onValueChange=${(username) => this.setState({ username })}/>
                        </span>
                        <span>
                            <${TextField}
                                label="E-mail"
                                value=${this.state.email}
                                onValueChange=${(email) => this.setState({ email })}/>
                        </span>
                        <span>
                            <${TextField}
                                label="Mot de passe"
                                password=true
                                value=${this.state.password}
                                onValueChange=${(password) => this.setState({ password })}/>
                        </span>
                        <div style="display: flex; justify-content: center;">
                            <button style=${Style.Link} onClick=${e => route('/')}>Annuler</button>
                            <button style=${Style.Button} type="submit">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}

export { InfoUser as default };