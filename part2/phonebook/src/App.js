import {useEffect, useState} from "react";
import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import NumbersList from "./components/NumbersList";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => { setPersons(response.data) })
  }, []);


  const personsShown = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)}/>

      <h2>Add new</h2>
      <AddForm
        newName={newName}
        newNumber={newNumber}
        onNewName={(e) => setNewName(e.target.value)}
        onNewNumber={(e) => setNewNumber(e.target.value)}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <NumbersList persons={personsShown} />
    </div>
  );
}

export default App;
