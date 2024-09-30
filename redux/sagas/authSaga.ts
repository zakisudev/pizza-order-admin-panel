import { call, put, takeLatest, Effect } from 'redux-saga/effects';
import {
  handleRegisterApi,
  handleLoginApi,
  handleLogoutApi,
} from '@/utils/api';
import authTypes from '@/redux/types/auth';
import { setUser, clearUser } from '@/redux/actions/auth';

function* register(action: any): Generator<Effect, void, any> {
  try {
    const data = yield call(handleRegisterApi, action.payload);
    if (data.error) {
      throw new Error(data.error);
    }
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}

function* login(action: any): Generator<Effect, void, any> {
  try {
    const data = yield call(handleLoginApi, action.payload);
    if (data.error) {
      throw new Error(data.error);
    }
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}

function* logout() {
  try {
    const data = yield call(handleLogoutApi);
    if (data.error) {
      throw new Error(data.error);
    }
    yield put(clearUser());
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(authTypes.REGISTER, register);
  yield takeLatest(authTypes.LOGIN, login);
  yield takeLatest(authTypes.LOGOUT, logout);
}
