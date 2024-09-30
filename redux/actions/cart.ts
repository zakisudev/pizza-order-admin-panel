import cartActionTypes from '@/redux/types/cart';

export const setPizza = (id: any) => ({
  type: cartActionTypes.SET_PIZZA,
  payload: id,
});

export const setType = (type: any) => ({
  type: cartActionTypes.SET_TYPE,
  payload: type,
});

export const addTopping = (topping: any) => ({
  type: cartActionTypes.ADD_TOPPING,
  payload: topping,
});

export const removeTopping = (topping: any) => ({
  type: cartActionTypes.REMOVE_TOPPING,
  payload: topping,
});

export const setQuantity = (quantity: any) => ({
  type: cartActionTypes.SET_QUANTITY,
  payload: quantity,
});
