const Filter = ({filter, onChange}) => (
  <div>
    Find countries: <input value={filter} onChange={onChange} />
  </div>
);

export default Filter;