import {Component} from "/lib/preact.js";
import {getUser} from "/app/model/Users.js";
import User from "/app/components/User.js"
import * as Style from '/app/model/Style.js';
import {getSessionId} from "/app/model/Session.js";


class Followed extends Component{
    state = {
        followed: [],
    }
    constructor() {
        super();
    }

    componentDidMount() {
        getUser(getSessionId(), user => this.setState({followed: user.followed }));
    }

    render() {
        return html `
            <div class="container">
                <h1 style=${Style.Title}>Abonnements</h1>
                ${this.state.followed.map(id => html `<div style=${Style.Padding16}> <${User} userId=${id} /> </div>`)}
            </div>
        `;
    }
}

export {Followed as default};