import { ADD_PROJECT_PAGE_IS_FETCHING } from '../constants/action-types';

export default function addProjectReducer(state = {isFetching: false}, action) {
    switch (action.type) {
      case ADD_PROJECT_PAGE_IS_FETCHING:
        return {...state, isFetching: !state.isFetching};
      default:
        return state;
    }
}
