import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';
import { getSessionId } from '/app/model/Session.js';


class CreatePost extends Component {
    state = {
        content: '',
        user: undefined
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

        if (this.props.onInput) {
            this.props.onInput(content);
        }
    }

    doCreate = () => {
        let newPost = document.getElementById("newPost");
        if (newPost.value === '' || getSessionId() === undefined) {
            alert("ERROR");
            return;
        }

        fetch("/api/query-create-post.php?idUser=" + getSessionId() + "&newPost=" + newPost.value)
            .then(function (response) { return response.json() })
            .then(uploadPost => {
                if (uploadPost === true) {
                    newPost.value = '';
                    window.location.reload();
                }
                else {
                    alert("Error nouveau post non enregistré");
                }
            })
    }

    render() {
        return html`
            <span style=${this.styleCreatePost}>
                <input
                    type="text"
                    style=${this.styleField}
                    placeholder="Quoi de neuf ?"
                    value=${this.state.content}
                    id="newPost"
                    onInput=${this.onTextInput}
                />
                <span class='overable' style=${this.styleButton} onclick=${this.doCreate}>
                    <${Icon} icon="send"/>
                </span>
            </span>`;
    }
}

export { CreatePost as default };
