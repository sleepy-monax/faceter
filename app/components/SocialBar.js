import { Component } from "/lib/preact.js";
import { getUser } from '/app/model/Users.js';
import { getSessionId } from '/app/model/Session.js';
import * as Style from '/app/model/Style.js';

class SocialBar extends Component {

    state = {
        followed: [],
        follower: [],
    }

    styleFollow = {
        display: "flex",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        padding: "16px 8px",
        marginBottom: "16px",
        overflow: "hidden"
    }

    constructor() {
        super();
    }

    componentDidMount() {
        this.loadBar()
    }

    loadBar() {
        getUser(this.props.userId, user => this.setState({ followed: user.followed, follower: user.followers }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.loadBar();
            this.createFollowButton();
        }
    }

    createFollowButton() {
        if (getSessionId() != this.props.userId) {
            fetch("/api/query-user-followed.php?sessionId=" + getSessionId() + "&followedId=" + this.props.userId)
                .then(function (response) {
                    return response.json()
                })
                .then(isFollowed => {
                    this.setState({isFollowed})
                });
            return html`<button style=${Style.Button}>${this.state.isFollowed? 'Fuir' : 'Suivre'}</button>`;
        }
    }

    render() {
        return html`
            <div style=${this.styleFollow}>
                ${this.createFollowButton()}
                <span style=${Style.Link}>
                    ${this.state.followed.length} abonnements
                </span>
                <span style=${Style.Link}>
                    ${this.state.follower.length} abonnés
                </span>
            </div >
    `;
    }
}
export { SocialBar as default };