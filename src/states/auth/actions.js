import * as type from "./constants";

export const login = payload => {
  return {
    type: type.LOGIN,
    payload
  };
};

export const logout = payload => {
  return {
    type: type.LOGOUT,
    payload
  };
};
