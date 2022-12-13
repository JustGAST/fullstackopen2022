import {useEffect, useState} from "react";

import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import NumbersList from "./components/NumbersList";
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService.getAll()
      .then(response => setPersons(response))
  }, []);


  const personsShown = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find(({name}) => name === newName)) {
      updatePerson(persons.find(person => person.name === newName));
      setNewName('');
      setNewNumber('');
      return;
    }

    personsService.create({
      name: newName,
      number: newNumber,
    })
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      })
  };

  const deletePerson = id => () => {
    const deletedPerson = persons.find(person => person.id === id)
    if (!window.confirm(`Do you really want to delete ${deletedPerson.name}`)) {
      return;
    }

    personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
  }

  const updatePerson = (person) => {
    if (!window.confirm(`${person.name} is already added to phonebook. Replace the old number with new one?`)) {
      return;
    }

    personsService
      .update(person.id, {...person, number: newNumber})
      .then(newPersonData => {
        setPersons(persons.map(person => person.id === newPersonData.id ? newPersonData : person))
      });
  }

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
      <NumbersList persons={personsShown} onDeletePerson={deletePerson}/>
    </div>
  );
}

export default App;
