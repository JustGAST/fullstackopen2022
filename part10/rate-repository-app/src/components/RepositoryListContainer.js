import {FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import {ItemSeparator} from './ItemSeparator.js';

const RepositoryListContainer = ({repositories}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem repository={item}/>}
    />
  );
}

export default RepositoryListContainer;