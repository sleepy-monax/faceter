import { Component } from '/lib/preact.js';
import { Router, route } from '/lib/preact-router.js'

import Navigation from '/app/components/Navigation.js'

import Feed from '/app/pages/Feed.js'
import Login from '/app/pages/Login.js'
import Join from '/app/pages/Join.js'
import Profile from '/app/pages/Profile.js'
import ViewPost from '/app/pages/ViewPost.js'
import Settings from '/app/pages/Settings.js'
import Error from '/app/pages/Error.js'
import Search from '/app/pages/Search.js'
import Follower from "/app/pages/Follower.js"
import Followed from "/app/pages/Followed.js"

import { isLoggedIn } from '/app/model/Session.js';

class App extends Component {
    constructor() {
        super();
    }

    handleRoute = async e => {
        if (e.url != '/login' && e.url != '/join' && !isLoggedIn()) {
            route('/login', true);
        }

        if (e.url == '/' && isLoggedIn()) {
            route('/feed', true);
        }
    };

    render() {
        return html`
        <div>
            <${Navigation}/>

            <${Router} onChange=${this.handleRoute}>
                <${Feed} path="/feed" />
                <${Login} path="/login" />
                <${Join} path="/join" />
                <${Profile} path="/profile/:userId" />
                <${ViewPost} path="/post/:postId" />
                <${Search} path="/search/:needle" />
                <${Settings} path="/settings" />
                <${Follower} path="/profile/:userId/follower" />
                <${Followed} path="/profile/:userId/followed" />
                <${Error} default />
            <//>
        </div>`;
    }
}

export { App as default };
