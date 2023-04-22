import {GET_REPOSITORY} from '../graphql/queries';
import useServerQuery from './useServerQuery.js';

const useRepository = (repositoryId) => {
  if (!repositoryId) {
    return {repository: null, loading: false}
  }

  const {data, loading} = useServerQuery(GET_REPOSITORY, {
    repositoryId
  });

  if (loading === false) {
    console.log("data, loading false");
    console.log(data, loading);
    return {repository: data.repository, loading}
  }

  console.log("data");
  console.log(data);

  return { repository: null, loading }
};

export default useRepository;