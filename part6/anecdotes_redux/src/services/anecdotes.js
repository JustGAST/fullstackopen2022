import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
}

const create = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0
  })

  return response.data;
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)

  return response.data;
}

const anecdotesService = { getAll, create, update };

export default anecdotesService