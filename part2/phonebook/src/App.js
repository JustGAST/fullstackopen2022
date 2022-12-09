import {useState} from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, {
      name: newName,
    }]);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
