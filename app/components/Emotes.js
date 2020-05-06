import { Component } from '/lib/preact.js';
import Emote from '/app/components/Emote.js';
import Icon from '/app/components/Icon.js';
import EmotePicker from '/app/components/EmotePicker.js'

class Emotes extends Component {
    state = {
        picker: false,
        emotes: []
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-reactions.php?postId=" + this.props.postId)
        .then(function (response) { return response.json()})
        .then(emotes => this.setState({ emotes }));
    }

    showPicker = e => {
        this.setState({ picker: true });
    }

    render() {
        return html`
<span class="emotes">
    ${this.state.emotes.map(emote => html`<${Emote} name="${emote.reactionType}" count="${emote.reactionCount}"/>`)}
    <${Icon} onClick=${this.showPicker} icon="add"/>
    ${this.state.picker ? html`<${EmotePicker}/>` : undefined}
</span>`;
    }
}

export { Emotes as default };