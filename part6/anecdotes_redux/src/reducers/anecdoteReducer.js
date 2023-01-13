import {createSlice} from '@reduxjs/toolkit';

const initialAnecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteAsObject = (anecdote) => ({
  id: getId(),
  content: anecdote,
  votes: 0
})

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((first, second) => first.votes - second.votes)
}

const initialState = sortByVotes(initialAnecdotes.map(anecdoteAsObject))

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        id: getId(),
        content: action.payload,
        votes: 0,
      }

      return sortByVotes([...state, newAnecdote])
    },
    voteForAnecdote(state, action) {
      const votedAnecdote = state.find(anecdote => anecdote.id === action.payload)
      votedAnecdote.votes += 1;

      sortByVotes(state);
    }
  }
})

export const { createAnecdote, voteForAnecdote } = anecdoteReducer.actions
export default anecdoteReducer.reducer