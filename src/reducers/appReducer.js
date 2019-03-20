import { OPEN_CLOSE_MODAL, OPEN_CLOSE_ASIDE, SHOW_ASIDE_BUTTONS } from '../constants/action-types';

export default function appReducer(state = { modal: false, aside: false }, action) {
    switch (action.type) {
        case OPEN_CLOSE_MODAL:
            return { ...state, modal: !state.modal };
        case OPEN_CLOSE_ASIDE:
            return { ...state, aside: action.payload };
        case SHOW_ASIDE_BUTTONS:
            return { ...state, aside_buttons: action.payload };
        default:
            return state;
    }
}
