/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

interface GlobalContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  cart: any;
  setCart: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyGlobalContext = createContext<GlobalContextProps>({
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
  cart: { pizza: {}, type: "", quantity: 1, toppings: [],  },
  setCart: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export default MyGlobalContext;
