import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => (
  axios.get(baseUrl).then(res => res.data)
)

export const addAnecdote = (data) => (
  axios.post(baseUrl, data).then(res => res.data)
)

export const voteAnecdote = (data) => (
  axios.put(`${baseUrl}/${data.id}`, data)
)