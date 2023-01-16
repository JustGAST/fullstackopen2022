import {updateFilter} from '../reducers/filterReducer';
import {connect} from 'react-redux';

const Filter = ({updateFilter}) => {
  return (
    <>
      filter:
      <input onChange={(e) => updateFilter(e.target.value)} />
    </>
  )
}

const ConnectedFilter = connect(
  null,
  {updateFilter}
)(Filter)

export default ConnectedFilter;