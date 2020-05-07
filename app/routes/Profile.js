import { Component } from '/lib/preact.js';
import Post from '/app/components/Post.js';
import { getUser } from '/app/model/Users.js';

class Profile extends Component {
    state = {
        user: undefined,
        posts: []
    }

    constructor() {
        super();
    }

    componentDidMount() {

        fetch("/api/query-posts-user.php?postAuthor=" + this.props.profileId)
            .then(function (response) { return response.json()})
            .then(posts => {
                this.setState({ posts });
            });

        getUser(this.props.profileId, user => this.setState({ user }));
    }

    render() {
        return html`
        <div class="container-profile">
            <img class="cover-image" src="${this.state.user ? this.state.user.coverPic : '/res/covers/default.jpg'}" />
            <img class="profile-image ahead" src="${this.state.user ? this.state.user.profilePic : '/res/users/default.jpg'}"/>
        </div>
        <div class="test">
            <div class="new-post">
                <input type="text" placeholder="Quoi de neuf ? " class="bg-transparent border-0"/>
                <input type="button" class="bg-transparent border-0 button" value="send"/>
            </div>
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>`;
    }
}

export { Profile as default };
