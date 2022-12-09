const AddForm = ({newName, newNumber, onNewName, onNewNumber, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNewName}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={onNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default AddForm;