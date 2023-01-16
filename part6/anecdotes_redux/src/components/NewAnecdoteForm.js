import {connect} from 'react-redux';
import {createAnecdote} from '../reducers/anecdoteReducer';

const NewAnecdoteForm = ({createAnecdote}) => {
  const createNewAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    e.target.content.value = '';

    createAnecdote(content);
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (content) => {
      dispatch(createAnecdote(content));
    }
  };
}

const ConnectedNewAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(NewAnecdoteForm)

export default ConnectedNewAnecdoteForm