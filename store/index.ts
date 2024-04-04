import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import countSlice from './count-slice';
import popoverSlice from './popover-slice';

const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    count: countSlice.reducer,
    popover: popoverSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
