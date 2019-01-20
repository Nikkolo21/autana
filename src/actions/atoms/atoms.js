import { ATOMS_SECTION_IS_FETCHING } from "../../constants/action-types";

export const atomSectionIsFetching = (payload) => ({ 
    type: ATOMS_SECTION_IS_FETCHING,
    payload
});