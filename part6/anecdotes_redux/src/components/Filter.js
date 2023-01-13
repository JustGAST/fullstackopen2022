import {useDispatch} from 'react-redux';

import {updateFilter} from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <>
      filter:
      <input onChange={(e) => dispatch(updateFilter(e.target.value))} />
    </>
  )
}

export default Filter;