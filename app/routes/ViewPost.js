import { Component } from '/lib/preact.js';

import Post from '/app/components/Post.js';

class ViewPost extends Component {

    constructor() {
        super();
    }


    render() {
        return html`
        <div>
            <${Post} postid="${this.props.postId}"/>
        </div>`;
    }
}

export { ViewPost as default };
