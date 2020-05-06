import { Component } from '/lib/preact.js';
import emotes from '/app/model/Emotes.js';



class Emote extends Component {
    
    
    constructor() {
        super();
    }

    render() {
        return html`
    <span class="emote">
        <img class="emote-image" src="/res/emotes/${emotes[this.props.name]}"/>
        ${ this.props.count > 1 ? html`<span class="emote-badge">${this.props.count}</span>` : undefined }
    </span>`;
    }
}

export { Emote as default };