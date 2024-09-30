import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  pizza: {},
  type: '',
  toppings: [] as string[],
  quantity: 1,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setPizza: (state, action: PayloadAction<string>) => {
      state.pizza = action.payload;
    },

    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },

    addTopping: (state, action: PayloadAction<string>) => {
      state.toppings?.push(action?.payload as string);
    },

    removeTopping: (state, action: PayloadAction<string>) => {
      state.toppings = state.toppings?.filter(
        (topping: any) => topping !== action.payload
      );
    },

    setQuantity: (state, action: PayloadAction<number>) => {
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
