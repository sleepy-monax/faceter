import {Component} from "/lib/preact.js";

class SocialBar extends Component{

    state = {
        followedList : [],
        followerList: []
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
        fetch("/api/query-followed-user.php?userId=2")
            .then(function (response) { return response.json()})
            .then(follow => {
                console.log(follow);
                this.state.followed = follow['Count_Followed'];
                this.state.followedList = follow['followed'].split(',');
            });
        fetch("/api/query-follower-user.php?userId=2")
            .then(function (response) { return response.json()})
            .then(follow => {
                console.log(follow);
                this.state.follower = follow['Count_Follower'];
                this.state.followerList = follow['follower'].split(',');
            });
    }

    render() {
        return html `
            <div class="container" style=${this.styleFollow}>
                <span class="overable">
                    Followed ${this.state.followed} 
                </span>
                <span class="overable">
                    Follower ${this.state.follower}
                </span>
            </div>
        `;
    }
}
export {SocialBar as default};