import {combineReducers} from 'redux';

import atomsReducer from './atomsReducer';
import clientReducer from './clientReducer';
import projectsReducer from './projectsReducer';
import addProjectReducer from './addProjectReducer';
import authReducer from './authReducer';

const reducer = {
    atoms: atomsReducer,
    add_projects: addProjectReducer,
    client: clientReducer,
    auth: authReducer,
    projects: projectsReducer,
}

export const rootReducer = combineReducers(reducer);