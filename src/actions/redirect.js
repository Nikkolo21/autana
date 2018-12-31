import { REDIRECT } from "../constants/action-types";

export const redirect = (redirect) => ({
    type: REDIRECT,
    redirect
});