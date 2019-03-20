import { PROJECTS_PAGE_IS_FETCHING, SET_PROJECT_ID } from "../../constants/action-types";

export const isFetching = () => ({
    type: PROJECTS_PAGE_IS_FETCHING
});

export const setProjectId = payload => ({
    type: SET_PROJECT_ID,
    payload
});