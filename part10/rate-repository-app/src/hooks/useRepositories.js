import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const useRepositories = () => {
  const {data, error, loading} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if (error) {
    console.log("error loading repositories", error);
  }

  if (loading === false && error === undefined) {
    return {repositories: data.repositories, loading}
  }

  return { repositories: null, loading }
};

export default useRepositories;