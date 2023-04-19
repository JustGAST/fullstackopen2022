import {GET_REPOSITORIES} from '../graphql/queries';
import useServerQuery from './useServerQuery.js';

const useRepositories = () => {
  const {data, loading} = useServerQuery(GET_REPOSITORIES)

  if (loading === false) {
    return {repositories: data.repositories, loading}
  }

  return { repositories: null, loading }
};

export default useRepositories;