import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

const themeSlice = createSlice({
  name: 'theme',
  initialState: Appearance.getColorScheme() ?? 'light',
  reducers: {
    toggle(state) {
      if (state === 'light') return 'dark';
      else return 'light';
    },
    set(state, action) {
      return action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
