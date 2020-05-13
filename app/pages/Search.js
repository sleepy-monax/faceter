import { Component } from '/lib/preact.js';

import { ajaxRequest } from "/app/model/Utils.js";
import Post from '/app/components/Post.js';
import User from '/app/components/User.js';

import * as Style from '/app/model/Style.js';


class Search extends Component {
    state = {
        result: undefined,
    }

    constructor() {
        super();
    }

    doSearch() {
        ajaxRequest(
            "search",
            { needle: this.props.needle },
            result => this.setState({ result }))
    }

    componentDidMount() {
        this.doSearch();
    }

    componentDidUpdate(prevProps) {
        if (this.props.needle != prevProps.needle) {
            this.doSearch();
        }
    }

    displayUsers() {
        if (this.state.result && this.state.result.users.length > 0) {
            return html`
                <div>${this.state.result.users.length} Utilisateurs</div>
                ${this.state.result.users.map(post => html`
                    <div style=${Style.Padding16}>
                        <${User} userId="${post}"/>
                    </div>
                `)}`
        }
    }

    displayPosts() {
        if (this.state.result && this.state.result.posts.length > 0) {
            return html`
                <div>${this.state.result.posts.length} Posts</div>
                ${this.state.result.posts.map(post => html`<${Post} postId="${post}"/>`)}`
        }
    }

    displaySearch() {
        if (this.state.result == undefined) {
            return html`Searching...`
        }

        if (this.state.result.posts.length == 0 &&
            this.state.result.users.length == 0) {
            return html`<div class='magic-container magic-spacer'>
            <div class='magic-card'>
                <div style=${Style.Illustration}>
                    <h1 style=${Style.Title}>Désoler :'(</h1>
                    <h1 style=${Style.SubTitle}>Mais il semble que "${this.props.needle}" n'exite pas...</h1>
                    <img src='/res/search.svg'/>
                </div>
            </div>
        </div>`
        }

        return html`
        <div class="container">
            <div style=${Style.Title}>Recherche</div>

            ${this.displayUsers()}
            ${this.displayPosts()}
        </div>`;
    }

    render() {
        return html`
        ${this.displaySearch()}
        `
    }
}

export { Search as default };
