import { HEADER_IS_FETCHING } from '../constants/action-types';

export default function clientReducer(state = {
  isFetching: false
}, action) {
    switch (action.type) {
      case HEADER_IS_FETCHING:
        return {...state, isFetching: action.isFetching};
      default:
        return state;
    }
}
