import { Component } from "/lib/preact.js";
import { getUser } from '/app/model/Users.js';
import * as Style from '/app/model/Style.js';

class SocialBar extends Component {

    state = {
        followed: [],
        follower: []
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
        getUser(this.props.userId, user => this.setState({ followed: user.followed, follower: user.followers }));
    }

    render() {
        return html`
            <div style=${this.styleFollow}>
                <button style=${Style.Button}>
                    Suivre
                </button>
                <span style=${Style.Link}>
                    ${this.state.followed.length} abonnements
                </span>
                <span style=${Style.Link}>
                    ${this.state.follower.length} abonnés
                </span>
            </div>
        `;
    }
}
export { SocialBar as default };