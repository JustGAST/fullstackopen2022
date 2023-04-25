import {Navigate, useParams} from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text.js';
import RepositoryItem from './RepositoryItem.js';
import {FlatList} from 'react-native';
import ReviewItem from './ReviewItem.js';
import {ItemSeparator} from './ItemSeparator.js';

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

  const reviews = repository.reviews.edges.map(edge => edge.node);
  console.log("RepositoryView.js:19", reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} />}
      keyExtractor={({id}) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} showButton={true} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryView;