import {Component} from "/lib/preact.js";
import {getSessionId} from "/app/model/Session.js";
import {getUser} from "/app/model/Users.js";

class InfoUser extends Component{

    constructor() {
        super();
    }


    styleField = {
        backgroundColor: "transparent",
        color: "var(--theme-foreground)",
        width: "100%",
        outline: "none",
        border: "none"
    }

    componentDidMount() {
        getUser(getSessionId(), user => {
            this.setState({name: user.userName, email: user.userMail, password: user.userPassword})
            console.log(user)
        });
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
                    />
                </span>
                <span>
                    Changer la photo de couverture :
                    <input 
                        type="file"
                        accept="image/jpeg"
                        style=${this.styleField}
                    />
                </span>
                <span>
                    Nom d'utilisateur : 
                    <input
                        type="text"
                        disabled="disabled"
                        value="${this.state.name}"
                        style=${this.styleField}
                    />
                </span>
                <span>
                    Adresse mail :
                    <input
                        type="text"
                        disabled="disabled"
                        value="${this.state.email}"
                        style=${this.styleField}
                    />
                </span>
                <span>
                    mot de passe :
                    <input
                        type="password"
                        disabled="disabled"
                        value="${this.state.password}"
                        style=${this.styleField}
                    />
                </span>
            </div>
        `;
    }
}

export {InfoUser as default};