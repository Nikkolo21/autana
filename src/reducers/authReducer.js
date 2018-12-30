import { LOGIN_PAGE_IS_FETCHING, LOGOUT, ADD_CLIENT_UID, REGISTER_PAGE_IS_FETCHING } from '../constants/action-types';

export default function loginReducer(
    state = {
        isFetching: false,
        isAuth: false
    }, action) {
    switch (action.type) {
        case LOGIN_PAGE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case REGISTER_PAGE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case LOGOUT:
            return { ...state, isAuth: false, isFetching: false };
        case ADD_CLIENT_UID:
            return { ...state, uid: action.payload, isAuth: true };
        default:
            return state;
    }
}
