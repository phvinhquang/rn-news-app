import {createSlice} from '@reduxjs/toolkit';

interface CountState {
  count: number;
  other: number;
}
const initCountState: CountState = {
  count: 0,
  other: 0,
};

const countSlice = createSlice({
  name: 'Authentication',
  initialState: initCountState,
  reducers: {
    increment(state) {
      state.count = state.count + 1;
    },
    decrement(state) {
      state.count = state.count - 1;
    },
    add(state, action) {
      state.count = state.count + action.payload;
    },
    changeOther(state) {
      state.other = state.other + 2;
    },
  },
});

export const countActions = countSlice.actions;

export default countSlice;
