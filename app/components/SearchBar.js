import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';


class SearchBar extends Component {
    constructor() {
        super();
    }

    render() {
        return html`
<div class="search-bar">
    <input type="text" class="search-field" placeholder="Search..."/>
    <div class="search-icon">
        <${Icon} icon="search"/>
    </div>
</div>`;
    }
}

export { SearchBar as default };
