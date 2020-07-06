import { fromJS } from 'immutable';

import * as types from './constants';
import * as localConstants from 'constants/local-storage';

const initState = fromJS({
  token: localStorage.getItem(localConstants.TOKEN),
  userInfo: {
    name: '',
    roles: [],
  },
});

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN:
      localStorage.setItem(localConstants.TOKEN, 'token');
      return state.setIn(['token'], payload);

    case types.LOGOUT:
      localStorage.removeItem(localConstants.TOKEN);
      return state.setIn(['token'], null);

    case types.GET_USER_INFO:
      return state.setIn(['userInfo'], payload);

    default:
      return state;
  }
};
