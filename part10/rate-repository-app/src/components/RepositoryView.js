import {Navigate, useParams} from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text.js';
import RepositoryItem from './RepositoryItem.js';

const RepositoryView = () => {
  const {id: repositoryId} = useParams();
  const {repository, loading} = useRepository(repositoryId);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!repository) {
    console.log("no repository");
    return <Navigate to={"/"}/>;
  }

  return (
    <RepositoryItem repository={repository} showLink={true}/>
  );
};

export default RepositoryView;