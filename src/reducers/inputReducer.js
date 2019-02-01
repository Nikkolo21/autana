import { CHOOSED_BASIC_INPUT } from '../constants/action-types';

export default function inputReducer(state = { data: false, isFetching: false }, action) {
    switch (action.type) {
        case CHOOSED_BASIC_INPUT:
            return { ...state, data: action.data };
        default:
            return state;
    }
}
