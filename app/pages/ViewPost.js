import { Component } from '/lib/preact.js';

import Post from '/app/components/Post.js';
import CreatePost from '/app/components/CreatePost.js';
import * as Style from '/app/model/Style.js';
import { observePosts, stopObservePosts } from "/app/model/Posts.js";

class ViewPost extends Component {
    state = {
        comments: [],
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-comments.php?postId=" + this.props.postId)
            .then(function (response) { return response.json() })
            .then(comments => this.setState({ comments }));

        observePosts(this, () => {
            fetch("/api/query-comments.php?postId=" + this.props.postId)
                .then(function (response) { return response.json() })
                .then(comments => this.setState({ comments }));
        });
    }

    componentWillUnmount() {
        stopObservePosts(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.postId !== prevProps.postId) {
            fetch("/api/query-comments.php?postId=" + this.props.postId)
                .then(function (response) { return response.json() })
                .then(comments => this.setState({ comments }));
        }
    }

    createIllustration() {
        if (this.state.comments.length > 0) {
            return;
        }

        return html`<div class='magic-container'>
            <div class='magic-card'>
                <div style=${Style.Illustration}>
                    <h1 style=${Style.Title}>Discussion</h1>
                    <h1 style=${Style.SubTitle}>Soyez le premier a commenter!</h1>
                    <img src='/res/comment.svg'/>
                </div>
            </div>
        </div>`
    }

    render() {
        return html`
        <div class="container">
            <${Post} postId="${this.props.postId}"/>
            <${CreatePost} answerTo="${this.props.postId}"/>
            ${this.state.comments.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>
            ${this.createIllustration()}
        `;
    }
}

export { ViewPost as default };
