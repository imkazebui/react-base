import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getAuthState = (state) => state[STATE_NAME];

const selectToken = () =>
  createSelector(getAuthState, (state) => state.getIn(['token']));

const selectUserRoles = () =>
  createSelector(getAuthState, (state) => state.getIn(['userInfo', 'roles']));

export { selectToken, selectUserRoles };
