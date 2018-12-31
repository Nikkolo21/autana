import { combineReducers } from 'redux';

import atomsReducer from './atomsReducer';
import clientReducer from './clientReducer';
import projectsReducer from './projectsReducer';
import addProjectReducer from './addProjectReducer';
import authReducer from './authReducer';
import redirectReducer from './redirectReducer';

const reducer = {
    add_project: addProjectReducer,
    atoms: atomsReducer,
    auth: authReducer,
    client: clientReducer,
    projects: projectsReducer,
    redirect: redirectReducer
}

export const rootReducer = combineReducers(reducer);