import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';
import { route } from "/lib/preact-router.js";


class SearchBar extends Component {
    state = {
        content: '',
    }

    styleSearch = {
        display: "flex",
        backgroundColor: "var(--theme-middleground)",
        height: "32px",
        marginBottom: "8px",
        marginTop: "8px",
        borderRadius: "8px",
        paddingLeft: "8px",
        overflow: "hidden"
    }

    styleField = {
        backgroundColor: "transparent",
        color: "var(--theme-foreground)",
        flexGrow: "1",
        width: "100%",
        outline: "none",
        border: "none"
    }

    styleButton = {
        width: "64px",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "32px",
        userSelect: "none",
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
    }

    constructor() {
        super();
    }

    onTextInput = e => {
        let content = e.target.value;
        this.setState({ content });

        if (this.props.onInput) {
            this.props.onInput(content);
        }
    }
    
    render() {
        return html`
<span style=${this.styleSearch}>
    <input
        type="text"
        style=${this.styleField}
        placeholder="Search..."
        value=${this.state.content}
        onInput=${this.onTextInput}
    />
    <span style=${this.styleButton} class='overable' onclick=${this.props.onSearch}>
        <${Icon} icon="search"/>
    </span>
</span>`;
    }
}

export { SearchBar as default };
