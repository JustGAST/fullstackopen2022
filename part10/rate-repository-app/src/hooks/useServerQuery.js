import {useQuery} from '@apollo/client';

const useRepositories = (query, variables) => {
  const {data, error, loading} = useQuery(query, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (error) {
    console.log("error loading data", error);
    return {data: null, loading: true};
  }

  return {data: data, loading};
};

export default useRepositories;