import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';
import Alert from '/app/components/Alert.js'
import Info from '/app/components/Info.js'
import { createTextPost } from "/app/model/Posts.js";


class CreatePost extends Component {
    state = {
        content: '',
        infoMessage: '',
        alertMessage: '',
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
        createTextPost(this.state.content, () => {
            this.setState({ infoMessage: 'Le post a été créer', alertMessage: '', content: '' })
        }, message => {
            this.setState({ infoMessage: '', alertMessage: message })
        });
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
            </span>
            <${Alert} message=${this.state.alertMessage}/>
            <${Info} message=${this.state.infoMessage}/>
            `;
    }
}

export { CreatePost as default };
