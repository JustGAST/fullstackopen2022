import Anecdote from './Anecdote';
import {useDispatch, useSelector} from 'react-redux';
import {voteForAnecdote} from '../reducers/anecdoteReducer';
import {clearNotification, showNotification} from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);

  const handleVote = (anecdote) => () => {
    dispatch(voteForAnecdote(anecdote.id));
    dispatch(showNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
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
          onVote={handleVote(anecdote)}
        />
      )}
    </>
  );
};

export default AnecdotesList;