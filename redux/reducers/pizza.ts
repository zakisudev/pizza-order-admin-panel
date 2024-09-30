import {createSlice} from '@reduxjs/toolkit';

// export type Pizza = {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   types: number[];
//   sizes: number[];
// };

const initialState = {
  pizzas: [],
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;