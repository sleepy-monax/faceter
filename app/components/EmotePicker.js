import { Component } from '/lib/preact.js';
import emotes from '/app/model/Emotes.js';
import SearchBar from '/app/components/SearchBar.js';
import Icon from '/app/components/Icon.js'

function levenshteinDistance(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}

class EmotePicker extends Component {
    state = {
        filter: ''
    }

    stylePicker = {
        position: "absolute",
        right: "0px",
        top: "0px",
        textAlign: "left",
        borderRadius: "8px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        padding: "16px",
        zIndex: "999",
    }

    styleHeader = {
        display: 'flex'
    }

    styleTitle = {
        flexGrow: 1,
        fontWeight: "bold",
        fontSize: "larger"
    }

    styleClose = {

    }

    styleList = {
        width: "300px",
        height: "250px"
    }

    styleItem = {
        display: 'flex',
        marginBottom: "4px",
        cursor: "pointer"
    }

    styleImage = {
        height: '24px',
        width: '24px',
        borderRadius: '4px',
        marginRight: '8px'
    }


    constructor() {
        super();
    }

    search = filter => {
        this.setState({ filter });
    }

    sortedList = () => {
        return Object
            .entries(emotes)
            .map(([name, filename]) => ({ name, filename }))
            .sort((a, b) => {
                return levenshteinDistance(a.name.substring(0, this.state.filter.length), this.state.filter) -
                    levenshteinDistance(b.name.substring(0, this.state.filter.length), this.state.filter);
            })
            .map(emote => {
                if (levenshteinDistance(emote.name, this.state.filter) <= emote.name.length) {
                    return html`
                <div style=${this.styleItem} onClick=${() => this.props.onEmoteSelected(emote.name)}>
                    <img style=${this.styleImage} src="/res/emotes/${emote.filename}"/>
                    <span class="emote-name">${emote.name}</span>
                </div>`
                }
            });
    }

    render() {
        return html`
        <span class="anchor">
            <div class="frontground-material" style=${this.stylePicker}>
                <div style=${this.styleHeader}>
                    <div style=${this.styleTitle}>
                        Emotes
                    </div>
                    <div style=${this.styleClose} onClick=${() => this.props.onClose()}>
                        <${Icon} icon="close"/>
                    </div>
                </div>

                <${SearchBar} onInput=${this.search}/>
                <div class="scroll">
                    <div style=${this.styleList}>
                        ${this.sortedList()}
                    </div>
                </div>
            </dialog>
        </span>`;
    }
}

export { EmotePicker as default };