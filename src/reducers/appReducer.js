import { OPEN_CLOSE_MODAL, OPEN_CLOSE_ASIDE, SHOW_ASIDE_BUTTONS, ASIDE_IS_LISTED, IS_MOBILE } from '../constants/action-types';

export default function appReducer(state = { modal: false, aside: false, aside_listed: false }, action) {
    switch (action.type) {
        case OPEN_CLOSE_MODAL:
            return { ...state, modal: !state.modal };
        case OPEN_CLOSE_ASIDE:
            return { ...state, aside: action.payload };
        case SHOW_ASIDE_BUTTONS:
            return { ...state, aside_buttons: action.payload };
        case ASIDE_IS_LISTED:
            return { ...state, aside_listed: action.payload };
        case IS_MOBILE:
            return { ...state, is_mobile: action.payload };
        default:
            return state;
    }
}
