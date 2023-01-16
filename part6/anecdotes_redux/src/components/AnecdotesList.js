import Anecdote from './Anecdote';
import {useDispatch, useSelector} from 'react-redux';
import {voteForAnecdote} from '../reducers/anecdoteReducer';
import {showNotification} from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => (
    state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
  ));

  const handleVote = (anecdote) => () => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(showNotification(`You voted for '${anecdote.content}'`, 5))
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