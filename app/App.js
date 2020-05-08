import { Component } from '/lib/preact.js';
import { Router, route } from '/lib/preact-router.js'

import Navigation from '/app/components/Navigation.js'

import Feed from '/app/routes/Feed.js'
import Login from '/app/routes/Login.js'
import Registration from '/app/routes/Registration.js'
import Profile from '/app/routes/Profile.js'
import ViewPost from '/app/routes/ViewPost.js'
import Error from '/app/routes/Error.js'

import { getSessionId } from '/app/model/Session.js';

class App extends Component {
    constructor() {
        super();
    }

    handleRoute = async e => {
        if (e.url != '/login' && getSessionId() == -1) { 
            route('/login', true);
        }
    };

    render() {
        return html`
        <div>
            <${Navigation}/>

            <${Router} onChange=${this.handleRoute}>
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
