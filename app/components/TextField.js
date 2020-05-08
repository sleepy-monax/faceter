import { Component } from '/lib/preact.js';
import { makeRef } from '/app/model/Utils.js'

class TextField extends Component {
    state = {
        value: ""
    }

    constructor() {
        super();

        this.fieldRef = makeRef()
    }

    render() {
        return html`
        <div class="text-field">
            <style>
                .label-before,
                .text-field input:valid+label::before,
                .text-field input:focus+label::before {
                    line-height: 20px;
                    font-size: 12px;
                    top: -10px;
                    background: var(--theme-background-alt);
                    border-radius: 6px;
                    padding: 0 6px;
                    left: 9px;
                }

                .text-field {
                    position: relative;
                    margin-bottom: 16px;
                }

                .text-field label::before {
                    content: attr(title);
                    position: absolute;
                    top: 0;
                    left: 15px;
                    line-height: 42px;
                    font-size: 14px;
                    color: #777;
                    transition: 100ms all;
                }

                .text-field input {
                    width: 100%;
                    line-height: 40px;
                    padding: 0 15px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: var(--theme-foreground);
                    border:1px solid var(--theme-border);
                    margin: 1px;
                    border-radius: 3px;
                    background: var(--theme-background-alt);
                }

                .text-field input:focus {
                    outline: 0;
                    margin: 0px;
                    border:2px solid var(--theme-accent);
                }

                .text-field input:valid+label::before {
                    content: attr(data-title);
                }

                .text-field input:focus+label::before {
                    color: var(--theme-accent);
                }
            </style>

            <input id=${this.fieldRef} type=${this.props.password ? "password" : "text"} required autocomplete="off" value=${this.props.value} onInput=${this.props.onInput}/>
            <label for=${this.fieldRef} title=${this.props.label} data-title=${this.props.label}></label>
        </div>`;
    }
}

export { TextField as default };
