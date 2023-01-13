import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notificationReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
    },
    clearNotification(state) {
      state = initialState;
    }
  }
})

export const {showNotification, clearNotification} = notificationReducer.actions;
export default notificationReducer.reducer;