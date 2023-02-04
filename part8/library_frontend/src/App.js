import {useEffect, useState} from 'react';

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const localToken = localStorage.getItem('library-token');
    if (localToken) {
      setToken(JSON.parse(localToken));
    }
  }, [])

  const onTokenSet = (token) => {
    setToken(token)
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      {error && <Notification message={error} />}

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'}/>
      <LoginForm show={page === 'login'} setToken={onTokenSet} setError={setError} />
    </div>
  )
}

export default App
