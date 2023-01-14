import {createSlice} from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((first, second) => first.votes - second.votes)
}

const initialState = []

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
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

export const initializeAnecdotes = () => (
  async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes))
  }
)

export const createAnecdote = (content) =>
  async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote));
  }

export const { appendAnecdote, voteForAnecdote, setAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer