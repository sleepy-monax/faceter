import { Component } from '/lib/preact.js';

class Post extends Component {
    postId;
    postBody;

    constructor(id, contenue) {
        super();
        this.state = {};
        this.postId = id;
        this.postBody = contenue;
    }

    render() {
        let post = new Post(1," I'm bodyguard");
        return html`
        <div class="post-container">
            <div class="post-title">
                ${post.postId}
            </div>
            <div class="post-body">
                ${post.postBody}
            </div>
        </div>`;
    }
}

export { Post as default };
