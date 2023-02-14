import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery} from 'react-query';

import {getAll} from './queries';

const App = () => {
  const result = useQuery('notes', getAll, {
    retry: 1
  })

  console.log(result);
  if (result.isLoading) {
    return <>Loading...</>
  }

  if (result.isError) {
    return <>Anecdote service is not available due to server errors.</>
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  };

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
