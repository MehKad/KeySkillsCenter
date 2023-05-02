import { USER_STATE_CHANGE, FETCH_CURRENT_USER_LESSONS } from "../constants";

const initialState = {
  currentUser: null,
  testtest: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
      break;
    case FETCH_CURRENT_USER_LESSONS:
      return {
        ...state,
        testtest: action.testtest,
      };
      break;
    default:
      return state;
  }
};
