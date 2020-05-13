import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js';

class Alert extends Component {
    style = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--theme-alert-background)',
        color: 'var(--theme-alert-foreground)',
        border: '1px solid var(--theme-alert-border)',
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
                        <${Icon} icon="error"/>
                        <span style="margin-left: 8px">${this.props.message}</span>
                    </div>`;
    }
}

export { Alert as default };
