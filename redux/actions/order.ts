import orderTypes from '@/redux/types/order';

export const setOrder = (order: any) => {
  return {
    type: orderTypes.MAKE_ORDER,
    payload: order,
  };
};

export const fetchOrders = () => {
  return {
    type: orderTypes.FETCH_ORDERS,
  };
}

export const fetchOrder = (id: any) => {
  return {
    type: orderTypes.FETCH_ORDER,
    payload: id,
  };
};