import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';


class SearchBar extends Component {
    state = {
        content: '',
    }

    constructor() {
        super();
    }

    onTextInput = e => {
        let content = e.target.value;
        this.setState({ content });

        if (this.props.onInput)
        {
            this.props.onInput(content);
        }
    }

    render() {
        return html`
<div class="search-bar">
    <input
        type="text"
        class="search-field"
        placeholder="Search..."
        value=${this.state.content}
        onInput=${this.onTextInput}
    />
    <div class="search-icon">
        <${Icon} icon="search"/>
    </div>
</div>`;
    }
}

export { SearchBar as default };
