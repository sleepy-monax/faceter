import { Component } from '/lib/preact.js';

import Post from '/app/components/Post.js';
import CreatePost from '/app/components/CreatePost.js';
import * as Style from '/app/model/Style.js';
import {getSessionId} from "/app/model/Session.js";


class Feed extends Component {
    state = {
        posts: []
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-posts.php?id=" + getSessionId())
            .then(function (response) { return response.json() })
            .then(posts => this.setState({ posts }));
    }

    render() {
        return html`
        <div class='container'>
            <${CreatePost}/>
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>
        <div class='magic-container'>
            <div class='magic-card'>
            <div style=${Style.Illustration}>
                <h1 style=${Style.Title}>Bravo!</h1>
                <h1 style=${Style.SubTitle}>Vous méritez bien une petite pause</h1>
                <img src='/res/finish.svg'/>
            </div>
            </div>
        </div>`;
    }
}

export { Feed as default };
