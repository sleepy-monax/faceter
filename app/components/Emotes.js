import { Component } from '/lib/preact.js';
import Emote from '/app/components/Emote.js';
import Icon from '/app/components/Icon.js';

class Emotes extends Component {
    state = {
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

    render() {
        return html`
<span class="emotes">
    ${this.state.emotes.map(emote => html`<${Emote} name="${emote.reactionType}" count="${emote.reactionCount}"/>`)}
    <${Icon} icon="add"/>
</span>`;
    }
}

export { Emotes as default };