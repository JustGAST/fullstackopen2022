import {useMutation, useQueryClient} from 'react-query';
import {addAnecdote} from '../queries';
import {useSetNotification} from '../context/NotificationContextProvider';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification()

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueriesData('anecdotes', anecdotes.concat(newAnecdote));
      setNotification(`New anecdote "${newAnecdote.content} was added"`);
    },
    onError: (error) => {
      let errorMessage = error.response?.data?.error;
      if (!errorMessage) {
        errorMessage = error.message;
      }

      setNotification(errorMessage);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
