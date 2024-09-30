"use client";

import { Provider } from 'react-redux';
import store, {persistor} from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default GlobalProvider