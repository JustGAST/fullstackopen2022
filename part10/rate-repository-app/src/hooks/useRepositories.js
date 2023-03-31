import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const useRepositories = () => {
  const {data, error, loading} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });
  console.log("data", data, "error", error, "loading", loading);

  if (error) {
    console.log(error);
  }

  if (loading === false && error === undefined) {
    console.log("data", data);
    return {repositories: data, loading}
  }

  return { repositories: null, loading }
};

export default useRepositories;