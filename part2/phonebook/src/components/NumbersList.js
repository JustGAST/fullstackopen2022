import PersonNumber from "./PersonNumber";

const NumbersList = ({persons}) => (
  <ul>
    {persons.map(person =>
      <PersonNumber key={person.id} person={person}/>
    )}
  </ul>
);

export default NumbersList;