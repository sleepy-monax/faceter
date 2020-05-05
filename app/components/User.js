import { Component } from '/lib/preact.js';

class User extends Component {
    state = {user : null};

    constructor(id) {
        super();
        this.state = {};
        this.userId = id;
        this.userBody = "Loading...";
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/query-user.php?userId=" + this.props.userId)
        .then(function (response) { return response.json()})
        .then(user => this.setState({ user }));
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
