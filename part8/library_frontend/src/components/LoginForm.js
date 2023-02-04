import {useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';

import {LOGIN} from '../queries';

const LoginForm = ({show, setToken, setError}) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => setError(error.message)
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!result.data) {
      return;
    }

    localStorage.setItem('library-token', JSON.stringify(result.data.login.value));
    setToken(result.data.login.value)
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return;
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login({variables: {username, password}});
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>login</h2>
      <label>
        username:
        <input type={'text'} value={username} onChange={({target}) => setUsername(target.value)} />
      </label>
      <br />
      <label>
        password:
        <input type={'password'} value={password} onChange={({target}) => setPassword(target.value)} />
      </label>
      <br />
      <button type={'submit'}>Login</button>
    </form>
  )
}

export default LoginForm