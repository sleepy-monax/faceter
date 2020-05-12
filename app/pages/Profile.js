import { Component } from '/lib/preact.js';
import Post from '/app/components/Post.js';
import { getUser } from '/app/model/Users.js';
import { getSessionId } from '/app/model/Session.js';
import CreatePost from '/app/components/CreatePost.js';
import SocialBar from '/app/components/SocialBar.js';
import { observePosts, stopObservePosts } from "/app/model/Posts.js"


class Profile extends Component {
    state = {
        user: undefined,
        posts: []
    }
    center = {
        textAlign: 'center'
    }

    containerProfile = {
        position: 'relative',
    }

    coverImage = {
        height: '256px',
        width: '100%',
        objectFit: 'cover',
    }

    profileImage = {
        borderRadius: '192px',
        width: '96px',
        height: '96px',
        marginRight: '16px',

        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    }

    profileName = {
        display: 'flex',
        padding: '16px',
        alignItems: 'center',
        position: 'absolute',
        height: '192px',
        background: 'linear-gradient(0deg, var(--theme-background) 0%, rgba(0,0,0,0) 60%)',

        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: '0',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        fontSize: '24px'
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-posts-user.php?postAuthor=" + this.props.userId)
            .then(function (response) {
                return response.json()
            })
            .then(posts => {
                this.setState({ posts });
            });

        getUser(this.props.userId, user => this.setState({ user }));

        observePosts(this, () => {
            this.setState({ posts: [] }); // XXX: Reload the feed.
            fetch("/api/query-posts-user.php?postAuthor=" + this.props.userId)
                .then(function (response) {
                    return response.json()
                })
                .then(posts => {
                    this.setState({ posts });
                });
        });
    }

    componentWillUnmount() {
        stopObservePosts(this);
    }

    getCreatePost() {
        if (getSessionId() == this.props.userId) {
            return html`<${CreatePost}/>`;
        }
    }

    render() {
        return html`
        <div class="magic-container magic-spacer">
            <div class="magic-card" style=${this.containerProfile}>
                <img style=${this.coverImage} src="${this.state.user ? this.state.user.coverPic : '/res/covers/default.jpg'}" />
                <div style=${this.profileName}>
                    <img style=${this.profileImage} src="${this.state.user ? this.state.user.profilePic : '/res/users/default.jpg'}"/>
                    <span>${this.state.user ? this.state.user.userName : undefined}</span>
                </div>
            </div>
        </div>
        <div class="container">
            <${SocialBar} userId=${this.props.userId}/>
            ${this.getCreatePost()}
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>`;
    }
}

export { Profile as default };
