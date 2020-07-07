import * as types from './constants';

export const getUserInfo = () => ({
  type: types.GET_USER_INFO,
});

export const saveUserInfo = (payload) => ({
  type: types.SAVE_USER_INFO,
  payload,
});
