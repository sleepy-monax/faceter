import {Component} from "/lib/preact.js";
import InfoUser from "/app/components/InfoUser.js"

class Settings extends Component {

    state = {
        info: false,
        statistic: false,
    }

    constructor() {
        super();
    }

    styleNavigation = {
        position: "fixed",
        display: "flex",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        padding: "20px 10px",
        overflow: "hidden",
        height: "100%",
        float: "left",
    }

    styleItem = {
        display: "block",
        width: "200px",
    }

    styleElement = {
        display: "flex",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        padding: "16px 8px",
        marginBottom: "16px",
        overflow: "hidden"
    }

    render() {
        return html `
            <div style=${this.styleNavigation} class="only-desktop">
                <nav class="ui-tabs-nav">
                    <ul>
                        <li><a class="overable" style=${this.styleItem} onclick=${function () {
                            document.getElementById("setting").innerHTML = html`<${InfoUser} />`;
                        }}>Informations personnelles</a></li>
                        <li><a class="overable" style=${this.styleItem} onclick=${function () {
                            document.getElementById("setting").innerHTML = html`Coucou`;   
                        }}>Statistique</a></li>
                    </ul>
                </nav>
            </div>
            <div class="container" style=${this.styleElement} id="setting">
                <${InfoUser} />
            </div>
        `;
    }
}
export {Settings as default};