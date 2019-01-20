import { OPEN_CLOSE_MODAL, ATOMS_SECTION_IS_FETCHING } from '../constants/action-types';

export default function atomsReducer(state = {modal: false, isFetching: false}, action) {
    switch (action.type) {
      case OPEN_CLOSE_MODAL:
        return {...state, modal: !state.modal};
      case ATOMS_SECTION_IS_FETCHING:
        return {...state, isFetching: action.payload}
      default:
        return state;
    }
}
