import { Component } from '/lib/preact.js';

let emotes = {
    "ahegao": "ahegao.png",
    "awesome": "awesome.png",
    "dab": "dab.gif",
    "dank": "dank-engine.png",
    "emotes": "emotes.json",
    "guillaume": "guillaume.png",
    "honkler": "honkler.png",
    "jerry": "jerry.png",
    "like": "like.png",
    "mathieu": "mathieu.jpg",
    "nicolas": "nicolas.png",
    "rain": "rain.gif",
    "rainbow-blob": "rainbow-blob.gif",
    "thonk": "thonk.jpg",
    "wow": "wow.png"
}

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