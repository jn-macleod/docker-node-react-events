import { createSlice } from '@reduxjs/toolkit';

const tokenKeyName = 'events-tt-token';
const initialToken = localStorage.getItem(tokenKeyName);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      localStorage.setItem(tokenKeyName, action.payload.token);
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(tokenKeyName);
      state.isLoggedIn = false;
    },
    refreshToken(state) {
      state.token = state.token ? state.token : initialToken;
      state.isLoggedIn = state.token ? true : false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
