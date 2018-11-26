import {combineReducers} from 'redux';

import atomsReducer from './atomsReducer';
import clientReducer from './clientReducer';
import projectsReducer from './projectsReducer';

export const rootReducer = combineReducers({atoms: atomsReducer, client: clientReducer, project: projectsReducer})