import {createSlice} from '@reduxjs/toolkit';
import {NewsSource} from '../screens/Home';

const newsSourceSlice = createSlice({
  name: 'news-source',
  initialState: NewsSource.VnExpress,
  reducers: {
    change(state, action) {
      return action.payload;
    },
  },
});

export const newsSourceActions = newsSourceSlice.actions;

export default newsSourceSlice;
