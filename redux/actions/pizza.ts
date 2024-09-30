import pizzaActions from '@/redux/types/pizza';

export const fetchPizzas = () => ({
  type: pizzaActions.FETCH_PIZZAS,
});

export const fetchPizza = (id: string) => ({
  type: pizzaActions.FETCH_PIZZA,
  payload: id,
});

export const setLoading = (loading: boolean) => ({
  type: pizzaActions.SET_LOADING,
  payload: loading,
});

export const setError = (error: string) => ({
  type: pizzaActions.SET_ERROR,
  payload: error,
});