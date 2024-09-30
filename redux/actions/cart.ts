import cartActionTypes from '@/redux/types/cart';

export const setPizza = (id) => ({
  type: cartActionTypes.SET_PIZZA,
  payload: id,
});

export const setType = (type) => ({
  type: cartActionTypes.SET_TYPE,
  payload: type,
});

export const addTopping = (topping) => ({
  type: cartActionTypes.ADD_TOPPING,
  payload: topping,
});

export const removeTopping = (topping) => ({
  type: cartActionTypes.REMOVE_TOPPING,
  payload: topping,
});

export const setQuantity = (quantity) => ({
  type: cartActionTypes.SET_QUANTITY,
  payload: quantity,
});
