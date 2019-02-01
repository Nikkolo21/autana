import { combineReducers } from 'redux';

import atomsReducer from './atomsReducer';
import clientReducer from './clientReducer';
import projectsReducer from './projectsReducer';
import addProjectReducer from './addProjectReducer';
import authReducer from './authReducer';
import redirectReducer from './redirectReducer';
import addAtomReducer from './addAtomReducer';
import inputReducer from './inputReducer';

const reducer = {
    add_project: addProjectReducer,
    add_atom: addAtomReducer,
    atoms: atomsReducer,
    auth: authReducer,
    input: inputReducer,
    client: clientReducer,
    projects: projectsReducer,
    redirect: redirectReducer
}

export const rootReducer = combineReducers(reducer);