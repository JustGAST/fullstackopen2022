import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notificationReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState;
    }
  }
})

export const {showNotification, clearNotification} = notificationReducer.actions;
export default notificationReducer.reducer;