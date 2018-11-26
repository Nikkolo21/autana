import {OPEN_CLOSE_MODAL} from '../constants/action-types';

export default function atomsReducer(state = {}, action) {
    switch (action.type) {
      case OPEN_CLOSE_MODAL:
        return {...state, modal: action.payload};
      default:
        return state;
    }
}
