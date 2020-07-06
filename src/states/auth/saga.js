import { put, takeLatest, select, call } from 'redux-saga/effects';

import axios from 'utilities/axios';
import { API } from 'constants/api';
import * as types from './constants';

function* getUserInfo() {
  try {
    const res = yield call(() => axios.get(API.USER_INFO));
  } catch (err) {}
}

export default function* sagas() {
  yield takeLatest(types.GET_USER_INFO, getUserInfo);
}
