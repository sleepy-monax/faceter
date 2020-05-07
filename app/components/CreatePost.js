import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';


class CreatePost extends Component {
    state = {
        content: '',
    }

    styleCreatePost = {
        display: "flex",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
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

    render() {
        return html`
<span style=${this.styleCreatePost}>
    <input
        type="text"
        style=${this.styleField}
        placeholder="Quoi de neuf ?"
        value=${this.state.content}
        onInput=${this.onTextInput}
    />
    <span style=${this.styleButton} class='overable'>
        <${Icon} icon="send"/>
    </span>
</span>`;
    }
}

export { CreatePost as default };
