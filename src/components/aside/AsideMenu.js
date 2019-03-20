import React, { Component } from 'react'
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import { openAndCloseAside, showAsideButtons } from '../../actions';

class AsideMenu extends Component {
    componentDidMount() {
        this.props._showAsideButtons({ show: false });
    }

    _closeAside = () => {
        this.props._showAsideButtons({ show: true, type: 'project' });
        this.props._openAndCloseAside(false);
    }

    render() {
        return (
            <div className="asideMenu">
                <p onClick={this._closeAside} className="closeLink">Cerrar</p>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _openAndCloseAside: openAndCloseAside,
        _showAsideButtons: showAsideButtons,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AsideMenu);