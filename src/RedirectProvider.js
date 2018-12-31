import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class RedirectProvider extends Component {
    render() {
        const { path } = this.props;
        return (
            <Fragment>
                {path && <Redirect to={path} />}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    path: state.redirect.path
})

export default connect(mapStateToProps)(withRouter(RedirectProvider));