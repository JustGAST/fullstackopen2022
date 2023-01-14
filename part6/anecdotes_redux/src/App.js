import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import AnecdotesList from './components/AnecdotesList';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdotesService from './services/anecdotes'
import {setAnecdotes} from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
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
