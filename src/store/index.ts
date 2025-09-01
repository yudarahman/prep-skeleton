import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit';

import { base } from '@/api/base';
import { databaseConnectionMiddleware } from '@/api/middleware/database';

const rootReducer = combineReducers({
  [base.reducerPath]: base.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([
        base.middleware,
        databaseConnectionMiddleware
      ])
});

type AppDispatch = typeof store.dispatch;
type AppStore = typeof store;
type RootState = ReturnType<typeof store.getState>;

export {
  type AppDispatch,
  type AppStore,
  type RootState,
  store
};