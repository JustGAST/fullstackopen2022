import AnecdotesList from './AnecdotesList';
import NewAnecdoteForm from './NewAnecdoteForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
