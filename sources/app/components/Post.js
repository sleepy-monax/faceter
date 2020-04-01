import { Component } from '/lib/preact.js';

class Post extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`
        <div class="post-container">
            <div class="post-title">
                ${this.props.postid}
            </div>
            <div class="post-body">
            </div>
        </div>`;
    }
}

export { Post as default };
