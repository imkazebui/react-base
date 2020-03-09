import * as types from "./constants";

export const login = payload => {
  return {
    type: types.LOGIN,
    payload
  };
};

export const logout = payload => {
  return {
    type: types.LOGOUT,
    payload
  };
};

export const getUserInfo = payload => ({
  type: types.GET_USER_INFO,
  payload
});
