import {
  USER_STATE_CHANGE,
  FETCH_CURRENT_USER_LESSONS,
  FETCH_ALL_FORMATIONS,
  FETCH_ALL_LESSONS,
  FETCH_DATA,
  FETCH_CURRENT,
  FETCH_GC_USERS,
} from "../constants";

const initialState = {
  currentUser: null,
  testtest: [],
  formations: [],
  lessons: [],
  data: {},
  current: "",
  users: [],
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
    case FETCH_ALL_FORMATIONS:
      return {
        ...state,
        formations: action.formations,
      };
      break;
    case FETCH_ALL_LESSONS:
      return {
        ...state,
        lessons: action.lessons,
      };
      break;
    case FETCH_DATA:
      return {
        ...state,
        data: action.data,
      };
      break;
    case FETCH_CURRENT:
      return {
        ...state,
        current: action.current,
      };
      break;
    case FETCH_GC_USERS:
      return {
        ...state,
        users: action.users,
      };
      break;
    default:
      return state;
  }
};
