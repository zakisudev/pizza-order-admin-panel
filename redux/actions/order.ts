import orderTypes from '@/redux/types/order';

export const setOrder = (order) => {
  return {
    type: orderTypes.MAKE_ORDER,
    payload: order,
  };
}

export const fetchOrders = () => {
  return {
    type: orderTypes.FETCH_ORDERS,
  };
}

export const fetchOrder = (id) => {
  return {
    type: orderTypes.FETCH_ORDER,
    payload: id,
  };
}