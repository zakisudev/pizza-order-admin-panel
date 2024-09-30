"use client";

import {useEffect} from 'react';
import axios from 'axios';

const OrderDetails = ({ params }) => {
  const { id } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`/api/orders/${id}`);

      if (!res || res.status !== 200) {
        return { error: 'An error occurred' };
      }

      return res.data;
    };

    fetchOrder();
  }, [id]);

  return <div>{id}</div>;
};

export default OrderDetails;
