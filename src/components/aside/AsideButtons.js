import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openAndCloseAside } from '../../actions';
import './aside.css';

class AsideButtons extends Component {
    _openAside = () => {
        this.props._openAndCloseAside(true);
    }

    render() {
        const { aside_button } = this.props;
        return (
            <Fragment>
                {aside_button.type === 'project' && <div className="asideButton" onClick={this._openAside}> Atoms </div>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    aside_button: state.app.aside_buttons
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _openAndCloseAside: openAndCloseAside
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AsideButtons);