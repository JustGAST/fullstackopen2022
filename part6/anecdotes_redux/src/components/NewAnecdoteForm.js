import {useDispatch} from 'react-redux';
import {createAnecdote} from '../reducers/anecdoteReducer';

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    e.target.content.value = '';

    dispatch(createAnecdote(content));
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