import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PublicHomePage extends Component {
  render() {
    return (
      <div>
        public
      </div>
    )
  }
}

const mapStateToProps = state => (
  state
)

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PublicHomePage);