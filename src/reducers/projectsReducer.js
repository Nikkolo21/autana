import { SEARCH_CLIENT_PROJECTS, PROJECTS_PAGE_IS_FETCHING } from '../constants/action-types';

export default function projectsReducer(state = { isFetching: false }, action) {
  switch (action.type) {
    case SEARCH_CLIENT_PROJECTS:
      return { ...state, projects: action.payload };
    case PROJECTS_PAGE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching };
    default:
      return state;
  }
}
