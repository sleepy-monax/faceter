import { Component } from '/lib/preact.js';
import { Router } from '/lib/preact-router.js'

import Navigation from '/app/components/Navigation.js'

import Home from '/app/routes/Home.js'
import Login from '/app/routes/Login.js'
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
            <${Home} path="/" />
            <${Login} path="/login" />
            <${Profile} path="/profile/:profileid" />
            <${ViewPost} path="/post/:postid" />
            <${Error} default />
            <//>
        </div>
            `;
    }
}

export { App as default };
