import { Component } from '/lib/preact.js';
import emotes from '/app/model/Emotes.js';
import SearchBar from '/app/components/SearchBar.js';

class EmoteDialog extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`
        <div class="emote-dialog">
            <div class="emote-title">
                Emotes
            </div>
            <${SearchBar}/>
            <div class="scroll">
                <div class="emote-dialog-content">
                    ${Object.entries(emotes).map(([name, filename]) => html`
                        <div>
                            <img class="emote-image" src="/res/emotes/${filename}"/>
                            <span class="emote-name">${name}</span>
                        </div>`
                    )}
                </div>
            </div>
        </div>`;
    }
}

export { EmoteDialog as default };