import { Component } from '/lib/preact.js';

import User from '/app/components/User.js';
import Emotes from '/app/components/Emotes.js';

import { getUser } from '/app/model/Users.js';
import { toHumanTime } from '/app/model/Time.js';

class Post extends Component {
    state = {
        post : undefined,
    };

    stylePost = {
        backgroundColor: 'var(--theme-background-alt)',
        color: 'var(--theme-foreground)',
        padding: '16px 16px',
        marginBottom: '16px',
        borderRadius: '8px',
    }

    styleHeader = {
        display: 'flex'
    }

    styleDate = {
        color: 'var(--theme-middleground-over)',
        fontSize: "0.75rem",
    }

    styleBody = {
        padding: '8px 0px',
    }

    styleFooter = {
        textAlign: 'right',
    }

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
            <div style=${this.stylePost}>
                <div class="post-body">
                    Loading...
                </div>
            </div>`;
        }
        else
        {
            return html`
            <div style=${this.stylePost}>
                <div style=${this.styleHeader}>
                    <${User} userId="${this.state.post.postAuthor}"/>
                    <div style=${this.styleDate}>
                        ${toHumanTime(this.state.post.postDate)}
                    </div>
                </div>
                <div style=${this.styleBody}>
                    ${this.state.post.postContent}
                </div>
                <div style=${this.styleFooter}>
                    <${Emotes} postId=${this.props.postId}/>
                </div>
            </div>`;
        }

    }
}

export { Post as default };
