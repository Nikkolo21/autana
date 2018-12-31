import { REDIRECT } from '../constants/action-types';

export default function redirectReducer(state = {
    isFetching: false,
    path: false
}, action) {
    switch (action.type) {
        case REDIRECT:
            return { ...state, path: action.redirect };
        default:
            return state;
    }
}
