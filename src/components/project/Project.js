import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { base } from '../../base';
import { connect } from 'react-redux';
import { timeStampToDate } from '../../helpers';
import MiniCaroussel from '../util/caroussel/MiniCaroussel';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atoms: [],
      atomsCount: 0,
      showCaroussel: false
    }
  }

  componentWillMount() {
    this.setState({ atomIsLoading: true });
    this.projectsRef = base.listenTo(`projects/${this.props.project.key}/atoms`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'creationDate'
      },
      then(atoms) {
        this.setState({ atoms: atoms.slice(0).reverse(), atomsCount: atoms[0] ? atoms.length : 0, atomIsLoading: false })
      }
    })
  }

  _onDeleteClick = () => {
    base.remove(`projects/${this.props.project.key}`, () => {
    }).then(() => {
      base.remove(`users/${this.props.uid}/projects/${this.props.project.key}`, error => {
      }).then(() => {
        console.log("deleted")
      })
    });
  }

  _showCaroussel = () => {
    this.setState({ showCaroussel: !this.state.showCaroussel })
  }

  render() {
    const { project: { key, name, creationDate } } = this.props; //tagColor
    const { atoms, atomsCount, showCaroussel, atomIsLoading } = this.state;
    let date = timeStampToDate(creationDate);
    return (
      <div className="mb-3">
        <div className="card card-body">
          <div className="p-5">
            <Link className="projectTitle" to={{ pathname: `my_projects/${key}` }}>
              <h4>{name}</h4>
            </Link>
            {
              !atomIsLoading ?
                (<a className={`ctaButton showAtomsLink ${atoms[0] ? showCaroussel && 'ctaButtonActive' : 'notAtoms'}`}
                  onClick={this._showCaroussel}>
                  {
                    (atoms[0] ? `${atomsCount} ${atomsCount > 1 ? 'Atoms' : 'Atom'}` : 'Not atoms')
                  }
                </a>) :
                (<div className="atomLinkLoader"></div>)
            }
            <i className="fas fa-times deleteX" title="delete project" onClick={this._onDeleteClick} />
            <small className="cardDate"
              title={`creation date: ${date.withHour}`}>
              {date.withOutHour}
            </small>
          </div>
        </div>
        {atoms[0] && showCaroussel && <MiniCaroussel project_key={key} atoms={atoms} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.auth.uid
})

export default connect(mapStateToProps)(Project);