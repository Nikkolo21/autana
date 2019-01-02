import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom';
import * as routes from '../../constants/routes';

import Board from '../user/Board';

export default class NomadRoutes extends Component {
    render() {
        return (
            <Fragment>
                <Route path={routes.BOARD} component={Board} />
            </Fragment>
        )
    }
}
