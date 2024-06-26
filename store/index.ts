import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import popoverSlice from './popover-slice';
import categoriesSlice from './categories-slice';
import newsSourceSlice from './news-source-slice';
import themeSlice from './theme-slice';

const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    categories: categoriesSlice.reducer,
    newsSource: newsSourceSlice.reducer,
    theme: themeSlice.reducer,
    popover: popoverSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
