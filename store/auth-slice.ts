import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  token: 'string' | null;
  isSignedIn: boolean;
}
const initAuthState: AuthState = {
  token: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'Authentication',
  initialState: initAuthState,
  reducers: {
    login(state, action) {
      state.isSignedIn = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isSignedIn = false;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
