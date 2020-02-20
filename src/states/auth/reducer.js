import * as types from "./constants";
import * as localConstants from "constants/local-storage";

const initState = {
  token: localStorage.getItem(localConstants.TOKEN)
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
    default:
      return state;
  }
};
