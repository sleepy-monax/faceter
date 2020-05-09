import {Component} from "/lib/preact.js";

class SocialBar extends Component{

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
        fetch("/api/query-follow-user.php?userId=2")
            .then(function (response) { return response.json()})
            .then(follow => {
                console.log(follow);
                this.state.follower = follow['nbFollower'];
                this.state.followed = follow['nbFollowed'];
            })
    }

    render() {
        return html `
            <div class="container" style=${this.styleFollow}>
                <span class="overable">
                    Follower ${this.state.follower} 
                </span>
                <span class="overable">
                    Followed ${this.state.followed}
                </span>
            </div>
        `;
    }
}
export {SocialBar as default};