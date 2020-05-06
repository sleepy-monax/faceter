import { Component } from '/lib/preact.js';

import SearchBar from '/app/components/SearchBar.js';

class Navigation extends Component {
    styleNavigation = {
        position: 'sticky',
        top: '0px',
        display: 'flex',
        width: '100%',
        padding: '16px 16px',
        backgroundColor: 'var(--theme-background-alt)',
        color: 'var(--theme-foreground)'
    }

    styleBrand = {
        fontSize: '32px',
        fontWeight: '900',
        padding: '0px 16px',
    }

    styleSearch = {
        flexGrow: '1',
        display:'flex',
        alignItems: 'center',
    }

    styleItems = {
        display:'flex',
        alignItems: 'center',
    }

    styleItem = {
        padding: '0px 16px',
    }

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`
        <div style=${this.styleNavigation}>
            <span style=${this.styleBrand} href="/">
                Faceter.
            </span>
            <span style=${this.styleSearch}>
                <${SearchBar}/>
            </span>
            <div style=${this.styleItems}>
                <a style=${this.styleItem} href="/">
                    Accueil
                </a>
                <a style=${this.styleItem} href="/profile/2">
                    Profile
                </a>
            </div>
        </div>`;
    }
}

export { Navigation as default };
