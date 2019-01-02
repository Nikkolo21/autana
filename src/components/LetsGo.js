import React, { Component } from 'react';
import './letsGo.css';
import { connect } from 'react-redux';
import { base } from '../base';
import * as routes from '../constants/routes';
import { bindActionCreators } from 'redux';
import { redirect } from '../actions/redirect';

class LetsGo extends Component {
    choosePath = (e) => {
        const { _redirect } = this.props;
        this.ref = base.post(`users/${this.props.uid}/profileData`, {
            data: { choosedUserType: true, userType: e.currentTarget.id }
        }).then(err => {
            if (!err) {
                _redirect(routes.BOARD)
            }
        })
        base.removeBinding(this.ref);
    }
    render() {
        return (
            <div className="wrap">
                <div id="nomad" className="chooseUsertypeBox wrap" onClick={this.choosePath}>
                    <div className="letsGoBoxTopSection wrap">
                        <div className="letsGoBoxImage" />
                    </div>
                    <div className="letsGoBoxBottomSection">
                    </div>
                </div>
                <div id="hunter" className="chooseUsertypeBox" onClick={this.choosePath}>
                    <div className="letsGoBoxTopSection wrap">
                        <div className="letsGoBoxImage">
                        </div>
                    </div>
                    <div className="letsGoBoxBottomSection"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    uid: state.auth.uid
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _redirect: redirect
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(LetsGo);