import { createSlice } from '@reduxjs/toolkit';

// export type Order = {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   types: number[];
//   sizes: number[];
// };

const initialState = {
  orders: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
