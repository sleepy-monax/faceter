import { Component } from "/lib/preact.js";
import { getSessionId } from "/app/model/Session.js";
import { getUser } from "/app/model/Users.js";
import * as Style from '/app/model/Style.js';
import { getSessionToken } from "/app/model/Session.js";

class InfoUser extends Component {

    constructor() {
        super();
    }

    styleField = {
        backgroundColor: "var(--theme-middleground)",
        color: "var(--theme-foreground)",
        outline: "none",
        width: "100%",
        border: "none"
    }

    componentDidMount() {
        getUser(getSessionId(), user => {
            this.setState({ name: user.userName, email: user.userMail, password: user.userPassword })
        });
    }

    sendProfilePicture() {

        let pathProfile = document.getElementById("ProfImg").files[0];
        let formData = new FormData();

        formData.append("photo", pathProfile);
        fetch('/api/upload-profile.php?sessionToken=' + getSessionToken(), {method: "POST", body: formData});
    }

    sendCoverPicture() {

        let pathCover = document.getElementById("CoverImg").files[0];
        let formData = new FormData();

        formData.append("photo", pathCover);
        fetch('/api/upload-cover.php?sessionToken=' + getSessionToken(), {method: "POST", body: formData});
    }

    doModify = e => {
        let newName = document.getElementById("nameUser").value;
        let newEmail = document.getElementById("EmailUser").value;
        let newPassword = document.getElementById("passwordUser").value;

        fetch("/api/query-update-info.php?id=" + getSessionId() + "&name=" + newName + "&password=" + newPassword + "&email=" + newEmail)
            .then(function (response) {
                return response.json()
            })
            .then(update => console.log(update))
        
        e.preventDefault();
    }

    render() {
        return html`
            <div>
                <form style=${Style.Padding16} onsubmit=${this.doModify}>
                    <span>
                        Changer la photo de profil :
                        <input 
                            type="file" 
                            accept="image/jpeg"
                            style=${this.styleField}
                            id="ProfImg"
                        />
                        <button style=${Style.Button} onClick=${()=>this.sendProfilePicture()}>Modifier</button>
                    </span>
                    <span>
                        Changer la photo de couverture :
                        <input 
                            type="file"
                            accept="image/jpeg"
                            style=${this.styleField}
                            id="CoverImg"
                        />
                        <button style=${Style.Button} onClick=${()=>this.sendCoverPicture()}>Modifier</button>
                    </span>
                    <span>
                        Nom d'utilisateur : 
                        <input
                            type="text"
                            value="${this.state.name}"
                            style=${this.styleField}
                            id="nameUser"
                            required
                        />
                    </span>
                    <span>
                        Adresse mail :
                        <input
                            type="text"
                            value="${this.state.email}"
                            style=${this.styleField}
                            id="EmailUser"
                            required
                        />
                    </span>
                    <span>
                        Mot de passe :
                        <input
                            type="password"
                            value="${this.state.password}"
                            style=${this.styleField}
                            id="passwordUser"
                            required
                        />
                    </span>
                    <button style=${Style.Button} type="submit">Modifier</button>
                </form>
            </div>
        `;
    }
}

export { InfoUser as default };