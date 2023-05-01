import {FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';

const RepositoryListContainer = ({repositories}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({item}) => <RepositoryItem repository={item}/>}
    />
  );
}

export default RepositoryListContainer;