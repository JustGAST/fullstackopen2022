import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries';

const SetBirthYear = ({authors}) => {
  const initialState = {
    name: '',
    setBornTo: '',
  };

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  });

  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    setFormState({...formState, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, setBornTo} = formState;
    setFormState(initialState);
    await editAuthor({
      variables: {
        name, setBornTo: Number(setBornTo)
      }
    });
  };

  return (
    <>
      <h3>Set birth year</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <select name="name" value={formState.name} onChange={handleChange}>
              {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
            </select>
          </label>
        </div>
        <div>
          <label>
            Birth year
            <input name="setBornTo" value={formState.setBornTo} onChange={handleChange}/>
          </label>
        </div>
        <div>
          <button type="submit">Change</button>
        </div>
      </form>
    </>
  );
};

export default SetBirthYear;