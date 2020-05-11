import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js'
import { toggleTheme, getTheme } from '/app/model/Theme.js'
import { route } from "/lib/preact-router.js";
import { getSessionId, logoff } from '/app/model/Session.js';

class Menu extends Component {
    state = {
        filter: ''
    }

    styleMenu = {
        position: "absolute",
        right: "16px",
        top: "16px",
        textAlign: "left",
        borderRadius: "8px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        padding: "16px",
        paddingBottom: "0px",
        zIndex: "999",
    }

    styleHeader = {
        display: 'flex',
        marginBottom: '16px',
    }

    styleTitle = {
        flexGrow: 1,
        fontWeight: "bold",
        fontSize: "larger"
    }

    styleClose = {

    }

    styleList = {
        width: "300px",
    }

    styleItem = {
        display: 'flex',
        marginBottom: "16px",
        cursor: "pointer"
    }

    styleText = {
        marginLeft: '8px'
    }


    constructor() {
        super();
    }

    render() {
        return html`
        <div class="frontground-material" style=${this.styleMenu}>
            <div style=${this.styleHeader}>
                <div style=${this.styleTitle}>
                    Menu
                </div>
                <div style=${this.styleClose} onClick=${() => this.props.onClose()}>
                    <${Icon} icon="close"/>
                </div>
            </div>

            <div style=${this.styleList}>
                <a class='only-mobile' style=${this.styleItem} href="/feed">
                    <${Icon} icon="home"/>
                    <span style=${this.styleText}>Accueil</span>
                </a>
                <a class='only-mobile' style=${this.styleItem} href=${"/profile/" + getSessionId()} >
                    <${Icon} icon="account_circle"/>
                    <span style=${this.styleText}>Profil</span>
                </a>
                <a style=${this.styleItem} onclick="${() => {
                        toggleTheme();
                        this.forceUpdate();
                    }}">
                    <${Icon} icon="${getTheme() == 'dark-theme' ? 'brightness_7' : 'brightness_3'}"/>
                    <span style=${this.styleText}>${getTheme() == 'dark-theme' ? 'Mode jour' : 'Mode nuit'}</span>
                </a>
                <a style=${this.styleItem} onclick="${() => logoff()}">
                    <${Icon} icon="exit_to_app" />
                    <span style=${this.styleText}>Déconnexion</span>
                </a>
            </div>
        </div>
        `;
    }
}

export { Menu as default };