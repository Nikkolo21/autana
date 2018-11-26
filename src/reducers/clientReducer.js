import {ADD_CLIENT_UID} from '../constants/action-types';

export default function clientReducer(state = {}, action) {
    switch (action.type) {
      case ADD_CLIENT_UID:
        return {...state, uid: action.payload};
      default:
        return state;
    }
}
