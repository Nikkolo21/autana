import { ADD_ATOMS_PAGE_IS_FETCHING } from "../../constants/action-types";

export const isFetching = (payload) => ({ 
    type: ADD_ATOMS_PAGE_IS_FETCHING,
    payload
});