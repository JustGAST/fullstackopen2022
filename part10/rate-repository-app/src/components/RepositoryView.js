import {Navigate, useMatch} from 'react-router-native';
import useRepository from '../hooks/useRepositoriy';

const RepositoryView = () => {
  const repositoryIdMatch = useMatch('/:id');
  const repositoryId = repositoryIdMatch ? repositoryIdMatch.params.id : null;

  const {repository} = useRepository(repositoryId);

  if (!repository) {
    console.log("no repository");
    return <Navigate to={"/"}/>;
  }

  return (
    <RepositoryView repository={repository} showLink={true}/>
  );
};

export default RepositoryView;