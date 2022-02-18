import { createSlice } from '@reduxjs/toolkit';

const tokenKeyName = 'events-tt-token';
const initialToken = localStorage.getItem(tokenKeyName);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: 'idle',
    token: initialToken,
    isLoggedIn: false,
  },
  reducers: {
    sendAuthRequest(state) {
      state.loading = 'pending';
    },
    authResponseReceived(state) {
      state.loading = 'idle';
    },
    login(state, action) {
      state.loading = 'idle';
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
