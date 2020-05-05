import { Component } from '/lib/preact.js';

import User from '/app/components/User.js';
import Emotes from '/app/components/Emotes.js';
import Icon from '/app/components/Icon.js';

class Post extends Component {
    state = {post : null};

    constructor(id) {
        super();
        this.state = {};
        this.postId = id;
        this.postBody = "Loading...";
    }

    componentDidMount() {
        fetch("/api/query-post.php?postId=" + this.props.postId)
        .then(function (response) { return response.json()})
        .then(post => this.setState({ post }));
    }

    render() {
        if (this.state.post === undefined)
        {
            return html`
            <div class="post-container">
                <div class="post-title">
                    ${this.props.postId}
                </div>
                <div class="post-body">
                    Loading...
                </div>
            </div>`;
        }
        else
        {
            return html`
            <div class="post-container">
                <div class="post-title">
                    <${User} userId="${this.state.post.postAuthor}"/>
                </div>
                <div class="post-date">
                    ${this.state.post.postDate}
                </div>
                <div class="post-body">
                    ${this.state.post.postContent}
                </div>
                <div class="post-emotes">
                    <${Emotes} postId=${this.props.postId}/>
                    <${Icon} icon="add"/>
                </div>
            </div>`;
        }

    }
}

export { Post as default };
