import { Component } from '/lib/preact.js';


import SearchBar from '/app/components/SearchBar.js';
import Icon from '/app/components/Icon.js';
import Menu from '/app/components/Menu.js';

class Navigation extends Component {
    state = {
        menu : false,
    }

    styleNavigation = {
        position: 'sticky',
        top: '0px',
        display: 'flex',
        width: '100%',
        padding: '8px 16px',
        backgroundColor: 'var(--theme-frontground)',
        boxShadow: "0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.1)",
        color: 'var(--theme-foreground)',
        zIndex: 999,
    }

    styleBrand = {
        fontSize: '24px',
        fontWeight: '900',
        padding: '0px 16px 0px 0px',
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
        padding: '0px 0px 0px 16px',
    }

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return html`
        <div style=${this.styleNavigation}>
            <div style=${this.styleItems}>

                <a style=${this.styleBrand} href="/">
                    Faceter.
                </a>
            </div>
            <span style=${this.styleSearch}>
                <${SearchBar}/>
            </span>
            <div style=${this.styleItems} class="only-desktop">
                <a style=${this.styleItem} href="/feed">
                    Accueil
                </a>
                <a style=${this.styleItem} href="/profile/2">
                    Profile
                </a>
            </div>
            <div style=${this.styleItems}>
                <a style=${this.styleItem} onClick=${() => {this.setState({menu : true})}}>
                    <${Icon} icon="more_vert"/>
                </a>
                ${this.state.menu ? html`<${Menu} onClose=${() => {this.setState({menu : false})}} />` : undefined}
            </div>
        </div>`;
    }
}

export { Navigation as default };
