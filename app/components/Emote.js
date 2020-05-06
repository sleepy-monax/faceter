import { Component } from '/lib/preact.js';
import emotes from '/app/model/Emotes.js';



class Emote extends Component {
    styleEmote = {
        padding: "2px",
        position: "relative",
    }

    styleImage = {
        height: "18px",
        width: "18px",
        borderRadius: "9px",
        marginRight: "2px"
    }

    styleBadge = {
        position: "absolute",
        background: "var(--theme-accent)",
        bottom: "0px",
        right: "0px",
        height: "0.75rem",
        width: "0.75rem",
        textAlign: "center",
        lineHeight: "0.75rem",
        fontSize: "0.5rem",
        borderRadius: "50%",
        color: "white",
        border: "1px solid var(--theme-accent)"
    }

    constructor() {
        super();
    }

    render() {
        if (this.props.count <= 1)
        {
            return html`
                <span style=${this.styleEmote}>
                    <img style=${this.styleImage} src="/res/emotes/${emotes[this.props.name]}"/>
                </span>`;
        }
        else
        {
            return html`
                <span style=${this.styleEmote}>
                    <img  style=${this.styleImage} src="/res/emotes/${emotes[this.props.name]}"/>
                    <span style=${this.styleBadge}>${this.props.count}</span>
                </span>`;
        }
    }
}

export { Emote as default };