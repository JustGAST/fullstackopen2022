import {createSlice} from '@reduxjs/toolkit';

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((first, second) => first.votes - second.votes)
}

const initialState = []

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      return sortByVotes([...state, action.payload])
    },
    voteForAnecdote(state, action) {
      const votedAnecdote = state.find(anecdote => anecdote.id === action.payload)
      votedAnecdote.votes += 1;

      sortByVotes(state);
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload)
    },
  }
})

export const { createAnecdote, voteForAnecdote, setAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer