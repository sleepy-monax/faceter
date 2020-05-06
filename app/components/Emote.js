import { Component } from '/lib/preact.js';
import emotes from '/app/model/Emotes.js';


class Emote extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`
    <span class="emote">
        <img class="emote-image" src="/res/emotes/${emotes[this.props.name]}"/>
        <span class="emote-badge">${this.props.count}</span>
    </span>`;
    }
}

export { Emote as default };