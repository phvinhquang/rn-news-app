import {createSlice} from '@reduxjs/toolkit';

interface Popover {
  shown: boolean;
}

const initPopoverState: Popover = {
  shown: false,
};

const popoverSlice = createSlice({
  name: 'popover',
  initialState: initPopoverState,
  reducers: {
    showPopover(state) {
      state.shown = true;
    },
    hidePopover(state) {
      state.shown = false;
    },
  },
});

export const popoverActions = popoverSlice.actions;

export default popoverSlice;
