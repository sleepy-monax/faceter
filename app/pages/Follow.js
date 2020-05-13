import {Component} from "/lib/preact.js";
import Follower from "/app/components/Follower.js"
import Followed from "/app/components/Followed.js"


class Follow extends Component{

    constructor() {
        super();
    }

    styleLeft={
        float: "left"
    }
    styleRight={
        float: "right"
    }

    render() {
        return html `
            <div class="container" >
                <div style=${this.styleLeft}>
                    <${Follower} />
                </div>
                <div style=${this.styleRight}>
                    <${Followed} />
                </div>
            </div>
        `;
    }
}

export {Follow as default};