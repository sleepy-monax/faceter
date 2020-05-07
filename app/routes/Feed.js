import { Component } from '/lib/preact.js';

import Post from '/app/components/Post.js';


class Feed extends Component {
    state = {
        posts: []
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-posts.php")
        .then(function (response) { return response.json()})
        .then(posts => this.setState({ posts }));
    }

    render() {
        return html`
        <div class='container'>
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>`;
    }
}

export { Feed as default };
