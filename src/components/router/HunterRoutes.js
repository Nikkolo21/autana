import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom';
import * as routes from '../../constants/routes';

import Projects from '../project/Projects';
import Atoms from '../atom/Atoms';
import ShowProject from '../project/ShowProject';
import AddProject from '../project/AddProject';
import Board from '../user/Board';
import ShowAtom from '../atom/ShowAtom';
import AddWork from '../work/AddWork';

export default class RootHunter extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path={routes.BOARD} component={Board} />
                <Route exact path={routes.PROJECTS} component={Projects} />
                <Route exact path={routes.ADD_PROJECT} component={AddProject} />
                <Route exact path={routes.SHOW_PROJECT} component={ShowProject} />
                <Route exact path={routes.ATOMS} component={Atoms} />
                <Route exact path={routes.SHOW_ATOM} component={ShowAtom} />
                <Route exact path={routes.ADD_WORK} component={AddWork} />
            </Fragment>
        )
    }
}
