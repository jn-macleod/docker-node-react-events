import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    loaded: false,
  },
  reducers: {
    replaceEvents(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.changed = false;
      state.loaded = true;
    },
    reloadEvents(state) {
      state.changed = true;
      state.loaded = false;
    },
  },
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;
