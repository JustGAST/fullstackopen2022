import {Navigate, useMatch} from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text.js';

const RepositoryView = () => {
  const repositoryIdMatch = useMatch('/:id');
  const repositoryId = repositoryIdMatch ? repositoryIdMatch.params.id : null;

  const {repository, loading} = useRepository(repositoryId);

  if (loading) {
    console.log("loading");
    return <Text>Loading...</Text>;
  }

  if (!repository) {
    console.log("no repository");
    return <Navigate to={"/"}/>;
  }

  return (
    <RepositoryView repository={repository} showLink={true}/>
  );
};

export default RepositoryView;