import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {getAll, voteAnecdote} from './queries';
import {useSetNotification} from './context/NotificationContextProvider';

const App = () => {
  const queryClient = useQueryClient();
  const result = useQuery('anecdotes', getAll)
  const setNotification = useSetNotification();
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: ({data: votedAnecdote}) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes',
        anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
      )
      setNotification(`Anecdote "${votedAnecdote.content} was voted, it has ${votedAnecdote.votes} votes now"`)
    }
  })

  if (result.isLoading) {
    return <>Loading...</>
  }

  if (result.isError) {
    return <>Anecdote service is not available due to server errors.</>
  }

  const handleVote = (anecdote) => {
    anecdote.votes++
    voteAnecdoteMutation.mutate(anecdote)
  };

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification/>
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
