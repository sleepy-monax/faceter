import { Component } from '/lib/preact.js';
import { Router } from '/lib/preact-router.js'

import Home from '/app/routes/Home.js'
import Login from '/app/routes/Login.js'
import Error from '/app/routes/Error.js'

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return html`
        <${Router}>
            <${Home} path="/" />
            <${Login} path="/login" />
            <${Error} default />
        <//>`;
    }
}

export { App as default };
