import { ADD_ATOMS_PAGE_IS_FETCHING } from '../constants/action-types';

export default function addAtomReducer(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case ADD_ATOMS_PAGE_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
}
