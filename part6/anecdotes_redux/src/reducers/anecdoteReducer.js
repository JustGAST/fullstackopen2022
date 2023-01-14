import {createSlice} from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((first, second) => first.votes - second.votes);
};

const initialState = [];

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      return sortByVotes([...state, action.payload]);
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload);
    },
  }
});

export const initializeAnecdotes = () => (
  async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
);

export const createAnecdote = (content) => (
  async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  }
);

export const voteForAnecdote = (anecdote) => (
  async (dispatch, getState) => {
    const updatedAnecdote = await anecdotesService.update({
      ...anecdote, votes: anecdote.votes + 1
    })

    const updatedAnecdotes = getState().anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)

    dispatch(setAnecdotes(updatedAnecdotes))
  }
)

export const {appendAnecdote, setAnecdotes} = anecdoteReducer.actions;
export default anecdoteReducer.reducer;