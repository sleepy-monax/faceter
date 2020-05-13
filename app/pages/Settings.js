import { Component } from "/lib/preact.js";
import InfoUser from "/app/components/InfoUser.js"

class Settings extends Component {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="magic-container magic-spacer" id="setting">
                <${InfoUser} />
            </div>
        `;
    }
}
export { Settings as default };