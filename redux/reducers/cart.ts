import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizza: {},
  type: '',
  toppings: [],
  quantity: 1,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setPizza: (state, action) => {
      state.pizza = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    addTopping: (state, action) => {
      state.toppings.push(action.payload);
    },

    removeTopping: (state, action) => {
      state.toppings = state.toppings.filter(
        (topping) => topping !== action.payload
      );
    },

    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    clearCart: (state) => {
      (state.pizza = {}),
        (state.type = ''),
        (state.toppings = []),
        (state.quantity = 1);
    },
  },
});

export const {
  setPizza,
  setType,
  addTopping,
  removeTopping,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
