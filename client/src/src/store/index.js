import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import eventsSlice from './events-slice';

const store = configureStore({
  reducer: { auth: authSlice.reducer, events: eventsSlice.reducer },
});

export default store;
