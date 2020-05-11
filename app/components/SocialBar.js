import { Component } from "/lib/preact.js";
import { getUser } from '/app/model/Users.js';

class SocialBar extends Component {

    state = {
        followed: [],
        follower: []
    }

    styleFollow = {
        display: "flex",
        backgroundColor: "var(--theme-frontground)",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        overflow: "hidden"
    }

    constructor() {
        super();
    }

    componentDidMount() {
        getUser(this.props.userId, user => this.setState({ followed: user.followed, follower: user.followers }));
    }

    render() {
        return html`
            <div class="container" style=${this.styleFollow}>
                <span class="overable">
                    ${this.state.followed.length} abonnements
                </span>
                <span class="overable">
                    ${this.state.follower.length} abonnés
                </span>
                <button>
                    Suivre
                </button>
            </div>
        `;
    }
}
export { SocialBar as default };