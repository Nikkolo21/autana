import { OPEN_CLOSE_MODAL, ADD_CLIENT_UID } from "../constants/action-types";

export const openAndCloseModal = modal => ({ 
    type: OPEN_CLOSE_MODAL,
    payload: modal
});

export const addClientUID = uid => ({ 
    type: ADD_CLIENT_UID,
    payload: uid
});