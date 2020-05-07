import { Component } from '/lib/preact.js';
import { Router } from '/lib/preact-router.js'

import Navigation from '/app/components/Navigation.js'

import Feed from '/app/routes/Feed.js'
import Login from '/app/routes/Login.js'
import Registration from '/app/routes/Registration.js'
import Profile from '/app/routes/Profile.js'
import ViewPost from '/app/routes/ViewPost.js'
import Error from '/app/routes/Error.js'

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return html`
        <div>
            <${Navigation}/>

            <${Router}>
                <${Feed} path="/feed" />
                <${Login} path="/login" />
                <${Registration} path="/registration" />
                <${Profile} path="/profile/:profileId" />
                <${ViewPost} path="/post/:postId" />
                <${Error} default />
            <//>
        </div>`;
    }
}

export { App as default };
