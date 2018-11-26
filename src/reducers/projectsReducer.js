import {SEARCH_CLIENT_PROJECTS} from '../constants/action-types';

export default function projectsReducer(state = {}, action) {
    switch (action.type) {
      case SEARCH_CLIENT_PROJECTS:
        return {...state, projects: action.payload};
      default:
        return state;
    }
}
