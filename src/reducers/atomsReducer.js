import {OPEN_CLOSE_MODAL} from '../constants/action-types';

export default function atomsReducer(state = {modal: false}, action) {
    switch (action.type) {
      case OPEN_CLOSE_MODAL:
        return {...state, modal: !state.modal};
      default:
        return state;
    }
}
