import AnecdotesList from './components/AnecdotesList';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdotesList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
