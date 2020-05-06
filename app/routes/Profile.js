import { Component } from '/lib/preact.js';
import Post from '/app/components/Post.js';

class Profile extends Component {
    state = {
        posts: []
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/query-posts-user.php?postAuthor=" + this.props.profileId)
            .then(function (response) { return response.json()})
            .then(posts => {
                this.setState({ posts });
            });

        fetch("http://localhost:8000/api/image-profile.php?profileId=" + this.props.profileId)
            .then(function (response) { return response.json()})
            .then(imageProfile => {
                this.setState({ imageProfile });
            })

        fetch("http://localhost:8000/api/image-cover.php?profileId=" + this.props.profileId)
            .then(function (response) { return response.json()})
            .then(imageCover => {
                this.setState({ imageCover });
            })
    }

    render() {
        return html`
        <div class="container-profile">
                <img class="cover-image" src="${this.state.imageCover}" />
                <img class=" profile-image ahead" src="${this.state.imageProfile}"/>
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
