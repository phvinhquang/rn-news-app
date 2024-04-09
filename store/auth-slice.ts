import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  isSignedIn: boolean;
}
const initAuthState: AuthState = {
  token: null,
  email: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'Authentication',
  initialState: initAuthState,
  reducers: {
    login(state, action) {
      state.isSignedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isSignedIn = false;
      state.token = null;
      state.email = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
