import Anecdote from './Anecdote';
import {useDispatch, useSelector} from 'react-redux';
import {voteForAnecdote} from '../reducers/anecdoteReducer';

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);

  const handleVote = (id) => () => {
    dispatch(voteForAnecdote(id));
  };

  if (!anecdotes) {
    return;
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdoteText={anecdote.content}
          votes={anecdote.votes}
          onVote={handleVote(anecdote.id)}
        />
      )}
    </>
  );
};

export default AnecdotesList;