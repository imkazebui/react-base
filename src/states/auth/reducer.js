import * as types from "./constants";
import * as localConstants from "constants/local-storage";

const initState = {
  token: localStorage.getItem(localConstants.TOKEN),
  userInfo: {
    name: "",
    roles: []
  }
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN:
      localStorage.setItem(localConstants.TOKEN, "token");
      return {
        ...state,
        token: payload
      };
    case types.LOGOUT:
      localStorage.removeItem(localConstants.TOKEN);
      return {
        ...state,
        token: null
      };
    case types.GET_USER_INFO:
      return {
        ...state,
        userInfo: payload
      };
    default:
      return state;
  }
};
