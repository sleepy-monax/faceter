import { Component } from '/lib/preact.js';

import Post from '/app/components/Post.js';
import CreatePost from '/app/components/CreatePost.js';



class Feed extends Component {
    state = {
        posts: []
    }

    styleImageContainer = {
        color: 'black',
        backgroundColor: 'white',
        padding: '32px',
    }

    styleTitle = {
        textAlign: 'center',
        fontSize: '64px',
        fontWeight: '900',
    }

    styleSubtitle = {
        textAlign: 'center',
        margin: '0px 0px 16px',
        fontSize: '18px',
        fontWeight: '450',
    }

    constructor() {
        super();
    }

    componentDidMount() {
        fetch("/api/query-posts.php")
            .then(function (response) { return response.json() })
            .then(posts => this.setState({ posts }));
    }

    render() {
        return html`
        <div class='container'>
            <${CreatePost}/>
            ${this.state.posts.map(post => html`<${Post} postId="${post.postId}"/>`)}
        </div>
        <div class='magic-container'>
            <div class='magic-card' style=${this.styleImageContainer}>
                <h1 style=${this.styleTitle}>Bravo!</h1>
                <h1 style=${this.styleSubtitle}>Vous méritez bien une petite pause</h1>
                <img src='/res/finish.svg'/>
            </div>
        </div>`;
    }
}

export { Feed as default };
