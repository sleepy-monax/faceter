import {Component} from '/lib/preact.js';
import Post from '/app/components/Post.js';
import {getUser} from '/app/model/Users.js';
import CreatePost from '/app/components/CreatePost.js';

class Profile extends Component {
    state = {
        user: undefined,
        posts: []
    }
    center = {
        textAlign: 'center'
    }

    containerProfile = {
        position: 'relative'
    }

    coverImage = {
        height: '320px',
        width: '100%',
        objectFit: 'cover',
    }

    profileImage = {
        position: 'absolute',
        borderRadius: '192px',
        width: '192px',
        height: '192px',

        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',

        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    }

    constructor() {
        super();
    }

    componentDidMount() {

        fetch("/api/query-posts-user.php?postAuthor=" + this.props.profileId)
            .then(function (response) {
                return response.json()
            })
            .then(posts => {
                this.setState({posts});
            });

        getUser(this.props.profileId, user => this.setState({user}));
    }

    render() {
        return html`
        <div style=${this.containerProfile}>
            <img style=${this.coverImage} src="${this.state.user ? this.state.user.coverPic : '/res/covers/default.jpg'}" />
            <img style=${this.profileImage} src="${this.state.user ? this.state.user.profilePic : '/res/users/default.jpg'}"/>
        </div>
        <div style=${this.newPost} class="container">
            <${CreatePost}/>
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>`;
    }
}

export {Profile as default};
