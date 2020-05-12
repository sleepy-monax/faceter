import {Component} from "/lib/preact.js";
import {getSessionId} from "/app/model/Session.js";
import {getUser} from "/app/model/Users.js";
import * as Style from '/app/model/Style.js';

class InfoUser extends Component{

    state = {
        editable: false
    }
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
            this.setState({name: user.userName, email: user.userMail, password: user.userPassword})
        });
    }

    doModify() {
        let pathProfil = document.getElementById("ProfImg").value;
        let pathCover = document.getElementById("CoverImg").value;
        let newName = document.getElementById("nameUser").value;
        let newEmail = document.getElementById("EmailUser").value;
        let newPassword = document.getElementById("passwordUser").value;

        fetch("/api/query-update-info.php?id="+ getSessionId() +"&name="+ newName + "&password=" + newPassword + "&email=" + newEmail)
            .then(function (response) {
                return response.json()
            })
            .then(update => console.log(update))
    }

    render() {
        return html `
            <div>
                <span>
                    Changer la photo de profil :
                    <input 
                        type="file" 
                        accept="image/jpeg"
                        style=${this.styleField}
                        id="ProfImg"
                    />
                </span>
                <span>
                    Changer la photo de couverture :
                    <input 
                        type="file"
                        accept="image/jpeg"
                        style=${this.styleField}
                        id="CoverImg"
                    />
                </span>
                <span>
                    Nom d'utilisateur : 
                    <input
                        type="text"
                        value="${this.state.name}"
                        style=${this.styleField}
                        id="nameUser"
                    />
                </span>
                <span>
                    Adresse mail :
                    <input
                        type="text"
                        value="${this.state.email}"
                        style=${this.styleField}
                        id="EmailUser"
                    />
                </span>
                <span>
                    mot de passe :
                    <input
                        type="password"
                        value="${this.state.password}"
                        style=${this.styleField}
                        id="passwordUser"
                    />
                </span>
                <button style=${Style.Button} onclick=${this.doModify}>Modifier</button>
            </div>
        `;
    }
}

export {InfoUser as default};