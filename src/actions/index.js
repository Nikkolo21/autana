import {
    OPEN_CLOSE_MODAL,
    ADD_CLIENT_UID,
    HEADER_IS_FETCHING,
    EMAIL_VERIFIED,
    CHOOSED_USER_TYPE,
    CHOOSED_BASIC_INPUT
} from "../constants/action-types";

export const openAndCloseModal = modal => ({
    type: OPEN_CLOSE_MODAL,
    payload: modal
});

export const addClientUID = uid => ({
    type: ADD_CLIENT_UID,
    payload: uid
});

export const isFetching = (isFetching) => ({
    type: HEADER_IS_FETCHING,
    isFetching
});

export const emailVerified = (emailVerified) => ({
    type: EMAIL_VERIFIED,
    emailVerified
});

export const choosedUserType = (data) => ({
    type: CHOOSED_USER_TYPE,
    data
});

export const chooseBasicInput = (data) => ({
    type: CHOOSED_BASIC_INPUT,
    data
});