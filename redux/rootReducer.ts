import { combineReducers } from 'redux';
import pizzaReducer from './reducers/pizza';
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';
import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
  auth: authReducer,
  pizzas: pizzaReducer,
  orders: orderReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
