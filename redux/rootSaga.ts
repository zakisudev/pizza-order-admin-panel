import { all, fork } from 'redux-saga/effects';
import pizzasSaga from './sagas/pizzaSaga';
import orderSaga from './sagas/orderSaga';
import authSaga from './sagas/authSaga';
import cartSaga from './sagas/cartSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(pizzasSaga), fork(orderSaga), fork(cartSaga)]);
}
