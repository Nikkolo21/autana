import { REGISTER_PAGE_IS_FETCHING } from "../../constants/action-types";

export const isFetching = (isFetching) => ({
    type: REGISTER_PAGE_IS_FETCHING,
    isFetching
});