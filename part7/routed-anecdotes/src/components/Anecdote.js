const Anecdote = ({anecdote}) => (
  <>
    <h3>{anecdote.content} by {anecdote.author}</h3>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see&nbsp;
      <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </>
)

export default Anecdote;