import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import AnecdotesList from './components/AnecdotesList';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import {initializeAnecdotes} from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <NewAnecdoteForm />
      <Filter />
      <AnecdotesList />
    </div>
  );
};

export default App;
