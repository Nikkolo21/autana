import React, { Component, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import AtomSearchList from './AtomSearchList';

export default class PubInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            isArroba: false
        }
    }

    _onKeyPress = (e) => {
        console.log(e.charCode, window.getSelection().getRangeAt(0));
        if (e.charCode === 64) {
            let sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement("div");
                    el.innerHTML = ReactDOMServer.renderToString(<AtomSearchList />)
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                    document.getElementById("searchAtom").focus();
                    document.getElementById("searchAtom").select();
                }
            } else if (document.selection && document.selection.type !== "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML("<b> hola </b>");
            }
        }
    }

    _handleEvent = (e) => {
        this.setState({ content: e.target.textContent });
    }

    render() {
        return (
            <Fragment>
                <div contentEditable name="content" className="mt-4"
                    style={{ backgroundColor: "white", border: "none", width: "800px", height: "200px" }}
                    onKeyPress={this._onKeyPress} onKeyUp={this._handleEvent} type="text">
                </div>
                <div id="content" style={{ backgroundColor: "white", border: "none", width: "800px", height: "200px" }}>
                    {this.state.content}
                </div>

            </Fragment>
        )
    }
}

