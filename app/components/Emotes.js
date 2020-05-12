import { Component } from '/lib/preact.js';
import Emote from '/app/components/Emote.js';
import Icon from '/app/components/Icon.js';
import EmotePicker from '/app/components/EmotePicker.js'
import { createReaction } from '/app/model/Posts.js'

class Emotes extends Component {
    state = {
        picker: false,
        emotes: []
    }

    style = {
        display: 'flex',
        justifyContent: 'flex-end'
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-reactions.php?postId=" + this.props.postId)
            .then(function (response) { return response.json() })
            .then(emotes => this.setState({ emotes }));
    }

    showPicker = e => {
        this.setState({ picker: true });
    }

    getEmotePicker() {
        if (this.state.picker) {
            return html`
                <${EmotePicker}
                    onClose=${() => this.setState({ picker: false })} 
                    onEmoteSelected=${emote => {
                    createReaction(emote, this.props.postId, () => {
                        fetch("/api/query-reactions.php?postId=" + this.props.postId)
                            .then(function (response) { return response.json() })
                            .then(emotes => this.setState({ emotes }));
                    });
                    this.setState({ picker: false })
                }}/>`;
        }
    }
    render() {
        return html`<span style=${this.style}>
            ${this.state.emotes.map(emote => html`<${Emote} name="${emote.reactionType}" count="${emote.reactionCount}"/>`)}
            <${Icon} onClick=${this.showPicker} icon="add"/>
            ${this.getEmotePicker()}
        </span>`;
    }
}

export { Emotes as default };