import { Component } from '/lib/preact.js';

import User from '/app/components/User.js';
import Emotes from '/app/components/Emotes.js';
import SocialCard from '/app/components/SocialCard.js'

import { toHumanTime } from '/app/model/Time.js';
import { makeRef } from '/app/model/Utils.js'


function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= window.innerHeight + 256 &&
        bounding.right <= window.innerWidth
    );
}

class Post extends Component {
    state = {
        postId: -1,
        post: undefined,
    };

    stylePost = {
        backgroundColor: 'var(--theme-background-alt)',
        color: 'var(--theme-foreground)',
        marginBottom: '16px',
        borderRadius: '8px',
        minHeight: '128px'
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
        overflowWrap: 'break-word',
    }

    styleFooter = {
        textAlign: 'right',
        padding: '8px 16px 8px',
    }

    constructor() {
        super();
        this.placeholderRef = makeRef()
        this.isFetching = false;
    }

    fetchPost(postId) {
        if (!this.isFetching) {
            this.isFetching = true;
            fetch("/api/query-post.php?postId=" + postId)
                .then(function (response) { return response.json() })
                .then(post => this.setState({ post }));
        }
    }

    componentDidMount() {
        this.setState({ postId: this.props.postId });

        var placeholder = document.getElementById(this.placeholderRef);

        if (isInViewport(placeholder)) {
            this.fetchPost(this.props.postId)
        } else {
            window.addEventListener('scroll', function (event) {
                if (isInViewport(placeholder)) {
                    this.fetchPost(this.props.postId)
                }
            }.bind(this), false);
        }
    }

    render() {
        if (this.state.post === undefined) {
            return html`
            <div id=${this.placeholderRef} class="loading" style=${this.stylePost}>
                <div style=${this.styleHeader}>
                </div>
            </div>`;
        } else {
            return html`
            <div style=${this.stylePost}>
                <div style=${this.styleHeader}>
                    <${User} userId="${this.state.post.postAuthor}"/>
                    <div style=${this.styleDate}>
                        ${toHumanTime(this.state.post.postDate)}
                    </div>
                </div>
                <div style=${this.styleBody}>
                    ${this.state.post.postType == "link" ? html`<${SocialCard} postCard=${this.state.post.postCard}/>` : this.state.post.postContent}
                </div>
                <div style=${this.styleFooter}>
                    <${Emotes} postId=${this.props.postId}/>
                </div>
            </div>`;
        }

    }
}

export { Post as default };
