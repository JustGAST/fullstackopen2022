const Anecdote = ({anecdoteText, votes, onVote}) => (
  <div>
    {anecdoteText}
    <br />
    has {votes} votes
    <button onClick={onVote}>vote</button>
  </div>
);

export default Anecdote;