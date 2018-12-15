import { OPEN_CLOSE_MODAL, ADD_CLIENT_UID, HEADER_IS_FETCHING } from "../constants/action-types";

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