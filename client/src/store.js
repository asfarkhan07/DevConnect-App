import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // devTools: true is default in development, so you can omit this
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;