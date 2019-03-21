import React, { Component } from 'react'
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import { openAndCloseAside, showAsideButtons, asideIsListed } from '../../actions';

class AsideMenu extends Component {
    componentDidMount() {
        this.props._showAsideButtons({ show: false });
    }

    _closeAside = () => {
        this.props._showAsideButtons({ show: true, type: 'project' });
        this.props._openAndCloseAside(false);
    }

    _changeView = () => {
        const { _asideIsListed, listed } = this.props;
        _asideIsListed(!listed);
    }

    render() {
        const { listed } = this.props;
        return (
            <div className="asideMenu">
                <div className="hud">
                    {
                        listed ?
                            <div title="cards" className="listAtomIcon" onClick={this._changeView}>
                                <div className="icon2">
                                    <div className="line1" />
                                    <div className="line2" />
                                </div>
                            </div> :
                            <div title="list" className="listAtomIcon" onClick={this._changeView}>
                                <div className="elm">
                                    <div className="line" />
                                </div>
                                <div className="elm">
                                    <div className="line" />
                                </div>
                            </div>
                    }
                    <a className="closeLink" onClick={this._closeAside}>
                        close
                    </a>
                </div>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listed: state.app.aside_listed
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _openAndCloseAside: openAndCloseAside,
        _showAsideButtons: showAsideButtons,
        _asideIsListed: asideIsListed,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AsideMenu);