import {useQuery} from '@apollo/client';

const useRepositories = (query) => {
  const {data, error, loading} = useQuery(query, {
    fetchPolicy: 'cache-and-network'
  });

  if (error) {
    console.log("error loading data", error);
    return {data: null, loading: true};
  }

  return {data: data, loading};
};

export default useRepositories;