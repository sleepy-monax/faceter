import { Component } from '/lib/preact.js';
import { getUser } from '/app/model/Users.js';

class User extends Component {
    state = {user : null};

    constructor(id) {
        super();
        this.state = {};
        this.userId = id;
        this.userBody = "Loading...";
    }

    componentDidMount() {
        getUser(this.props.userId, user => this.setState({ user }));
    }

    render() {
        if (this.state.user === undefined)
        {
            return html`
            <div class="user-container">
                <div class="user-name">
                    Loading...
                </div>
            </div>`;
        }
        else
        {
            return html`
            <div class="user-container">
                <div class="user-name">
                    ${this.state.user.userName}
                </div>
            </div>`;
        }

    }
}

export { User as default };
