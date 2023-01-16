import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notificationReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState;
    }
  }
})

let timeoutID;

export const showNotification = (text, timeoutSeconds) => (
  async (dispatch) => {
    dispatch(setNotification(text))
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => dispatch(clearNotification()), timeoutSeconds * 1000);
  }
)

export const {setNotification, clearNotification} = notificationReducer.actions;
export default notificationReducer.reducer;