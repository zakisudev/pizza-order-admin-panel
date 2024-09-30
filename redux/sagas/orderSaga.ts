import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserOrders } from '@/utils/api';
import orderActions from '@/redux/types/order';
import { setOrders } from '@/redux/reducers/order';

function* fetchOrdersSaga(): any {
  try {
    const orders = yield call(fetchUserOrders);

    yield put(setOrders(orders));
  } catch (error) {
    console.error(error);
  }
}

export default function* ordersSaga() {
  yield takeLatest(orderActions.FETCH_ORDERS, fetchOrdersSaga);
}
