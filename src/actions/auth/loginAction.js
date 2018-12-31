import { LOGIN_PAGE_IS_FETCHING, LOGOUT } from "../../constants/action-types";

export const isFetching = (isFetching) => ({ 
    type: LOGIN_PAGE_IS_FETCHING,
    isFetching
});

export const logout = () => ({ 
    type: LOGOUT
});