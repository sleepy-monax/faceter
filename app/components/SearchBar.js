import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';
import {route} from "/lib/preact-router.js";


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

        if (this.props.onInput)
        {
            this.props.onInput(content);
        }
    }

    search() {
        let name = document.getElementById("searchText").value;
        fetch("/api/query-search-user.php?username="+ name)
            .then(function (response) {
                return response.json()
            })
            .then(id => {
                if (id !== -1)
                    route("/profile/" + id);
            })
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
        id="searchText"
    />
    <span style=${this.styleButton} class='overable' onclick=${this.search}>
        <${Icon} icon="search"/>
    </span>
</span>`;
    }
}

export { SearchBar as default };
