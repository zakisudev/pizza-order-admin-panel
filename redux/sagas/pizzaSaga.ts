import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPizzas, fetchPizza } from '@/utils/api';
import pizzaActions from '@/redux/types/pizza';
import { setPizzas } from '@/redux/reducers/pizza';
import {setPizza, setType} from '@/redux/reducers/cart'

function* fetchPizzasSaga() {
  try {
    const pizzas = yield call(fetchPizzas);

    yield put(setPizzas(pizzas));
  } catch (error) {
    console.error(error);
  }
}

function* fetchPizzaSaga(action) {
  try {
    const pizza = yield call(fetchPizza, action.payload);

    yield put(setPizza(pizza));
    yield put(setType(pizza?.types[0]));
  } catch (error) {
    console.error('Failed to fetch pizza details:', error);
  }
}

export default function* pizzaSaga() {
  yield takeLatest(pizzaActions.FETCH_PIZZAS, fetchPizzasSaga);
  yield takeLatest(pizzaActions.FETCH_PIZZA, fetchPizzaSaga);
}