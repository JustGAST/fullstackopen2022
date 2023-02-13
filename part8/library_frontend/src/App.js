import {useEffect, useState} from 'react';

import Authors from './components/Authors';
import Books from './components/Books';
import AddBook from './components/AddBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import {useApolloClient, useSubscription} from '@apollo/client';
import RecommendedBooks from './components/RecommendedBooks';
import {BOOK_ADDED_SUBSCRIPTION} from './queries';
import {updateCache} from './helpers/updateCache';

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem('library-token');
    if (localToken) {
      setToken(localToken);
    }
  }, [])

  useSubscription(BOOK_ADDED_SUBSCRIPTION, {
    onData: ({data}) => {
      const addedBook = data.data.bookAdded;
      console.log(addedBook);

      showError(`Book "${addedBook.title}" added`)

      updateCache(client.cache, addedBook)
    }
  })

  const onTokenSet = (token) => {
    setToken(token)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-token')
    client.resetStore()
    setPage('authors')
  }

  const showError = (error) => {
    setError(error)
    setTimeout(() => setError(null), 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      {error && <Notification message={error} />}

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'} />
      <RecommendedBooks show={page === 'recommended'} />
      <AddBook show={page === 'add'} setError={showError}/>
      <LoginForm show={page === 'login'} setToken={onTokenSet} setError={showError} />
    </div>
  )
}

export default App
