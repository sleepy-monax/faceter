import { Component } from '/lib/preact.js';

import Post from '/app/components/Post.js';
import CreatePost from '/app/components/CreatePost.js';
import * as Style from '/app/model/Style.js';
import { getSessionId } from "/app/model/Session.js";
import { observePosts, stopObservePosts } from "/app/model/Posts.js"

class Feed extends Component {
    state = {
        posts: []
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-posts.php?userId=" + getSessionId())
            .then(function (response) { return response.json() })
            .then(posts => this.setState({ posts }));

        observePosts(this, () => {
            this.setState({ posts: [] }); // XXX: Reload the feed.
            fetch("/api/query-posts.php?userId=" + getSessionId())
                .then(function (response) { return response.json() })
                .then(posts => this.setState({ posts }));
        });
    }

    componentWillUnmount() {
        stopObservePosts(this);
    }

    createIllustration() {
        if (this.state.posts.length == 0) {
            return;
        }

        return html`<div class='magic-container'>
            <div class='magic-card'>
                <div style=${Style.Illustration}>
                    <h1 style=${Style.Title}>Bravo!</h1>
                    <h1 style=${Style.SubTitle}>Vous méritez bien une petite pause</h1>
                    <img src='/res/finish.svg'/>
                </div>
            </div>
        </div>`
    }

    render() {
        return html`
        <div class='container'>
            <${CreatePost}/>
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>
        ${this.createIllustration()}
        `;
    }
}

export { Feed as default };
