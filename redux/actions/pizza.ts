import pizzaActions from '@/redux/types/pizza';

export const fetchPizzas = () => ({
  type: pizzaActions.FETCH_PIZZAS,
});

export const fetchPizza = (id: string) => ({
  type: pizzaActions.FETCH_PIZZA,
  payload: id,
});