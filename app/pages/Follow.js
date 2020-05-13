import {Component} from "/lib/preact.js";
import Follower from "/app/components/Follower.js"
import Followed from "/app/components/Followed.js"


class Follow extends Component{

    constructor() {
        super();
    }


    render() {
        return html `
            <style>
                @media screen and (max-width: 560px) {
                    .follow-container {
                        display: block;
                    }
                }

                @media screen and (min-width: 560px) {
                    .follow-container {
                        display: flex;
                    }
                }

            </style>
            <div class="container follow-container" >
                <div style="flex-grow: 1;">
                    <${Follower} userId=${this.props.userId}/>
                </div>
                <div style="flex-grow: 1;">
                    <${Followed} userId=${this.props.userId}/>
                </div>
            </div>
        `;
    }
}

export {Follow as default};