import {useDispatch} from 'react-redux';
import {createAnecdote} from '../reducers/anecdoteReducer';
import anecdotesService from '../services/anecdotes';

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    e.target.content.value = '';

    const response = await anecdotesService.create(content)
    dispatch(createAnecdote(response));
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default NewAnecdoteForm