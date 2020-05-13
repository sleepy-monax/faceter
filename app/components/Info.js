import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';

class Info extends Component {
    style = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--theme-info-background)',
        color: 'var(--theme-info-foreground)',
        border: '1px solid var(--theme-info-border)',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '24px',
    }

    constructor() {
        super();
    }

    render() {
        if (!this.props.message) {
            return;
        }

        return html`<div style=${this.style}>
                        <${Icon} icon="done"/>
                        <span style="margin-left: 8px">${this.props.message}</span>
                    </div>`;
    }
}

export { Info as default };
