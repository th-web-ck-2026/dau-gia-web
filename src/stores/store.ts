import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app/app.slice';
import authReducer from './auth/auth.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const store = makeStore();
