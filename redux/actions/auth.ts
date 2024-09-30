import authTypes from '@/redux/types/auth';

export const login = (credentials) => {
  return {
    type: authTypes.LOGIN,
    payload: credentials,
  };
}

export const logout = () => {
  return {
    type: authTypes.LOGOUT,
  };
}

export const register = (credentials) => {
  return {
    type: authTypes.REGISTER,
    payload: credentials,
  };
}

export const setUser = (user) => {
  return {
    type: authTypes.SET_USER,
    payload: user,
  };
}

export const clearUser = () => {
  return {
    type: authTypes.CLEAR_USER,
  };
}