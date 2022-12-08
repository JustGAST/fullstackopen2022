const Anecdote = ({anecdoteText, votes}) => (
  <div>
    {anecdoteText}
    <br />
    has {votes} votes
  </div>
);

export default Anecdote;