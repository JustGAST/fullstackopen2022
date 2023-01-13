import {createSlice} from '@reduxjs/toolkit';

const initialState = ''

const filterReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilter(state, action) {
      return action.payload
    },
  }
})

export const { updateFilter } = filterReducer.actions;
export default filterReducer.reducer;