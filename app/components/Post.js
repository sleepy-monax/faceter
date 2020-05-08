import { Component } from '/lib/preact.js';

import User from '/app/components/User.js';
import Emotes from '/app/components/Emotes.js';
import SocialCard from '/app/components/SocialCard.js'

import { getUser } from '/app/model/Users.js';
import { toHumanTime } from '/app/model/Time.js';

class Post extends Component {
    state = {
        post : undefined,
    };

    stylePost = {
        backgroundColor: 'var(--theme-background-alt)',
        color: 'var(--theme-foreground)',
        marginBottom: '16px',
        borderRadius: '8px',
    }

    styleHeader = {
        display: 'flex',
        padding: '16px 16px 16px',
    }

    styleDate = {
        color: 'var(--theme-middleground-over)',
        fontSize: "0.75rem",
    }

    styleBody = {
        padding: '0px 16px',
    }

    styleFooter = {
        textAlign: 'right',
        padding: '8px 16px 8px',
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
                    ${this.state.post.postType == "link" ? html`<${SocialCard} postCard=${this.state.post.postCard}/>`: this.state.post.postContent}
                </div>
                <div style=${this.styleFooter}>
                    <${Emotes} postId=${this.props.postId}/>
                </div>
            </div>`;
        }

    }
}

export { Post as default };
