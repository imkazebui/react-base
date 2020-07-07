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
    case types.SAVE_USER_INFO:
      console.log('reducfer', payload);
      return state.setIn(['userInfo'], payload);

    default:
      return state;
  }
};
