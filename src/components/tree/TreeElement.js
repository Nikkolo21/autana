import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Tree.css';

class TreeElement extends Component {
    render() {
        const { elem } = this.props;
        return (
            <Link className="treeBox" to={{ pathname: `/atom/${elem.key}` }}>
                <div title={elem.name} className={`treeElem ellipsisText ${elem.type}`}>
                    {elem.name}
                </div>
            </Link>
        )
    }
}

const mapStateToProps = state => ({
    treeElems: state.tree && state.tree.tree && state.tree.tree.sort((a, b) => a.order - b.order),
    treeData: state.tree,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TreeElement);