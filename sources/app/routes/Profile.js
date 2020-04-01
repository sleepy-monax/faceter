import { Component } from '/lib/preact.js';

class Profile extends Component {

    constructor() {
        super();
    }


    render() {
        return html`
        <div>
            <h1>Profile</h1>
            <h2>${this.props.profileid}</h2>
        </div>`;
    }
}

export { Profile as default };
