import { ADD_PROJECT_PAGE_IS_FETCHING } from '../constants/action-types';

export default function addProjectReducer(
  state = {
    isFetching: false,
    tagColors: [
      "#E42B2B",
      "#b93b51",
      "#FFA501",
      "yellow",
      "#515195",
      "#4183FF",
      "#41833F",
      "#84D284",
      "black"
    ]
  }, action) {
  switch (action.type) {
    case ADD_PROJECT_PAGE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching };
    default:
      return state;
  }
}
