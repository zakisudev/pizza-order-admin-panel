import { put, takeLatest, call } from 'redux-saga/effects';
import { setPizza } from '@/redux/actions/cart';
import cartActionTypes from '@/redux/types/cart';
import { fetchPizza } from '@/utils/api';

function* handleSetPizza(action: any): any {
  try {
    const pizza = yield call(fetchPizza, action.payload);
    console.log(pizza);
    yield put(setPizza(pizza));
  } catch (error) {
    console.error('Failed to fetch pizza details:', error);
  }
}

// Watcher saga to monitor dispatched actions
export default function* cartSaga() {
  yield takeLatest(cartActionTypes.SET_PIZZA, handleSetPizza);
}
