import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAtom } from '../../services/atomServices';
import './Tree.css';
import { setTree } from '../../actions/tree/tree';

class TreeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { elem } = this.props;
        getAtom(elem.id, doc => {
            this.setState({ ...doc.data() });
        }, error => {
            console.log(error);
        })
    }

    _onDragStart = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    render() {
        const { elem } = this.props;
        const { name } = this.state;
        return (
            <div className="treeBox">
                <div className="row">
                    {
                        name &&
                        <div id={elem.id} draggable="true" onDragStart={this._onDragStart} className={`treeElem ${elem.type}`}>
                            <p> {name} : {elem.order} </p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    treeElems: state.tree && state.tree.tree && state.tree.tree.sort((a, b) => a.order - b.order),
    treeData: state.tree,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _setTree: setTree,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TreeElement);