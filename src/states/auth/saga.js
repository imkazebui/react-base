import { put, takeLatest, select, call } from 'redux-saga/effects';

import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';
import * as actions from './actions';

function* getUserInfo() {
  try {
    const res = yield call(() => axios.get(API.USER_INFO));
    yield put(actions.saveUserInfo(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    console.log('errData', errData);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_USER_INFO, getUserInfo);
}
