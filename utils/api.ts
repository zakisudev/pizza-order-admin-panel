import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

export const handleRegisterApi = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, userData);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: error?.response };
  }
};

export const handleAdminUserRegisterApi = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, user);

    if (!res || res.status !== 201) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}

export const handleLoginApi = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, userData);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
   return { error: error?.response };
  }
};

export const handleLogoutApi = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/logout`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const fetchPizzas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/pizzas`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const fetchPizza = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/pizzas/${id}`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const fetchUserOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/orders`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    if (error.status === 401) {
      return { error: 'Unauthorized' };
    } else if (error.status === 404) {
      return { error: 'No orders found' };
    }

    return { error: 'An error occurred' };
  }
};

export const handleUserUpdateApi = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, { ...data });

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}

export const handleAddPizzaApi = async (pizza) => {
  try {
    const res = await axios.post(`${BASE_URL}/pizzas`, { ...pizza });

    if (!res || res.status !== 201) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const orderApi = async (order) => {
  try {
    const res = await axios.post(`${BASE_URL}/orders`, { order });

    if (!res || res.status !== 201) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const orderStatusUpdateApi = async (id, status) => {
  try {
    const res = await axios.put(`${BASE_URL}/orders/${id}`, { status });

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}

export const deleteUserApi = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}

export const fetchRoles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/roles`);

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const handleAddRoleApi = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/roles`, { ...data });

    if (!res || res.status !== 201) {
      return {error: 'An error occurred'};
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

export const updateRoleStatus = async (status) => {
  try {
    const res = await axios.put(`${BASE_URL}/roles/${id}`, { status });

    if (!res || res.status !== 200) {
      return { error: 'An error occurred' };
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}

export const deleteRoleApi = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/roles/${id}`);

    if (!res || res.status !== 200) {
      return {error: "An error occurred"};
    }

    return res.data;
  } catch (error) {
    return { error: 'An error occurred' };
  }
}