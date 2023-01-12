import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Button from "./Button";
import Anecdote from "./Anecdote";
import {voteForAnecdote} from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);

  const [selected, setSelected] = useState(anecdotes[0]);

  const handleSelectNextAnecdote = () => {
    const random = Math.random();
    const randomSelected = Math.floor(random * anecdotes.length);

    setSelected(anecdotes[randomSelected]);
  };

  const handleVote = () => {
    dispatch(voteForAnecdote(selected.id));
  };

  const getMostVotedAnecdote = () => {
    const maxVotedAnecdote = anecdotes.reduce((previous, current) => {
      return current.votes > previous.votes ? current : previous;
    }, anecdotes[0]);

    return [maxVotedAnecdote, maxVotedAnecdote.votes];
  };

  const [mostVotedAnecdote, mostVotes] = getMostVotedAnecdote();

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdoteText={selected.content} votes={selected.votes}/>

      <div>
        <Button text="vote" onClick={handleVote}/>
        <Button text="next anecdote" onClick={handleSelectNextAnecdote}/>
      </div>

      <h2>Anecdote with most votes</h2>
      <Anecdote anecdoteText={mostVotedAnecdote.content} votes={mostVotes}/>
    </div>
  );
};

export default App;
