import {Component} from "/lib/preact.js";
import {getUser} from "/app/model/Users.js";
import User from "/app/components/User.js"
import * as Style from '/app/model/Style.js';


class Follower extends Component{
    state = {
        follower: [],
    }
    constructor() {
        super();
    }

    componentDidMount() {
        getUser(this.props.userId, user => this.setState({follower: user.followers }));
    }

    render() {
        return html `
            <div class="container">
                <h1 style=${Style.Title}>Abonnés</h1>
                ${this.state.follower.map(id => html `<div style=${Style.Padding16}><${User} userId=${id} /> </div>`)}
            </div>
        `;
    }
}

export {Follower as default};