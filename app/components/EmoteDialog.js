import { Component } from '/lib/preact.js';
import emotes from '/app/model/Emotes.js';
import SearchBar from '/app/components/SearchBar.js';

function levenshteinDistance (a, b) {
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }

class EmoteDialog extends Component {
    state = {
        filter: ''
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
        .map(([name, filename]) => ({name,  filename}))
        .sort((a, b) => {
            return levenshteinDistance(a.name.substring(0, this.state.filter.length), this.state.filter) - 
                   levenshteinDistance(b.name.substring(0, this.state.filter.length), this.state.filter);
        })
        .map(emote => {
            if (levenshteinDistance(emote.name, this.state.filter) <= emote.name.length)
            {
                return html`
                <div class="emote-item">
                    <img class="emote-image-big" src="/res/emotes/${emote.filename}"/>
                    <span class="emote-name">${emote.name}</span>
                </div>`
            }
        });
    }

    render() {
        return html`
        <div class="emote-dialog">
            <div class="emote-title">
                Emotes
            </div>
            <${SearchBar} onInput=${this.search}/>
            <div class="scroll">
                <div class="emote-dialog-content">
                    ${this.sortedList()}
                </div>
            </div>
        </div>`;
    }
}

export { EmoteDialog as default };