import PersonNumber from "./PersonNumber";

const NumbersList = ({persons, onDeletePerson}) => (
  <ul>
    {persons.map(person =>
      <li key={person.id}>
        <PersonNumber  person={person}/>&nbsp;
        <button onClick={onDeletePerson(person.id)}>Delete</button>
      </li>
    )}
  </ul>
);

export default NumbersList;