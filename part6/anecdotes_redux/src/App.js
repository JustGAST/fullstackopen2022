import AnecdotesList from './components/AnecdotesList';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
