import { Component } from '/lib/preact.js';
import Icon from '/app/components/Icon.js'


class SocialCard extends Component {
    constructor() {
        super();
    }

    styleCard = {
    }

    styleTitle = {
        padding: '0px 0px 8px',
    }

    styleImage = {
        borderRadius: '8px',
        overflow: 'hidden'
    }

    renderTitle(card) {
        let result = ''

        if (card['title']) {
            result += card['title']
        }

        if (result != '' && card['site_name']) {
            result += ' • '
        }

        if (card['site_name']) {
            result += card['site_name']
        }

        if (result == '') {
            result = card.link
        }

        return result
    }

    render() {
        let card = this.props.postCard;

        return html`
        <a href=${card.link} target="_blank">
            <div style=${this.styleCard}>
                <div style=${this.styleTitle}>
                    <${Icon} icon="launch"/>
                    <span style="padding-left:4px">
                        ${this.renderTitle(card)}
                    </span>
                </div>
                <div>
                    ${card.description}
                </div>
                <div style=${this.styleImage}>
                    <img class="fit-picture" src=${card.image} />
                </div>
            </div>
        </a>
        `;
    }
}

export { SocialCard as default };