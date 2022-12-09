const PersonNumber = ({person}) => (
  <li key={person.name}>{person.name}: {person.number}</li>
);

export default PersonNumber;