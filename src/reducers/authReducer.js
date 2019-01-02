import { LOGIN_PAGE_IS_FETCHING, LOGOUT, ADD_CLIENT_UID, REGISTER_PAGE_IS_FETCHING, ADD_USER_TYPE, EMAIL_VERIFIED, CHOOSED_USER_TYPE } from '../constants/action-types';

export default function loginReducer(
    state = {
        isFetching: false
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
        case EMAIL_VERIFIED:
            return { ...state, emailVerified: action.emailVerified };
        case ADD_USER_TYPE:
            return { ...state, userType: action.payload, choosedUserType: true };
        case CHOOSED_USER_TYPE:
            return { ...state, choosedUserType: action.data.choosedUserType, userType: action.data.userType || false }
        default:
            return state;
    }
}
