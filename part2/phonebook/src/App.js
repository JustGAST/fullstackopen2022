import {useEffect, useState} from "react";

import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import NumbersList from "./components/NumbersList";
import personsService from './services/persons';
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  const emptyMessage = {message: '', type: ''};
  const [message, setMessage] = useState(emptyMessage);

  useEffect(() => {
    personsService.getAll()
      .then(response => setPersons(response))
  }, []);


  const personsShown = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const showNotification = (message, type) => {
    setMessage({message, type})
    setTimeout(() => setMessage(emptyMessage), 5000);
  }

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
        showNotification(`Person ${newPerson.name} was created`, 'success');
      })
      .catch(error => console.log(error.message));
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
        showNotification(`Person ${deletedPerson.name} was deleted`, 'success');
      })
      .catch(() => {
        setPersons(persons.filter(person => person.id !== id));
        showNotification(`Person ${deletedPerson.name} was already deleted`, 'danger');
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
        showNotification(`Person ${newPersonData.name} was updated`, 'success');
      })
      .catch(error => {
        if (error.response.status === 404) {
          setPersons(persons.filter(currentPerson => currentPerson.id !== person.id));
          showNotification(`Person ${person.name} has already been removed from server`, 'danger');
        } else {
          showNotification(error.message, 'danger');
        }
      });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)}/>

      {message && <Notification message={message.message} type={message.type}/>}

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
