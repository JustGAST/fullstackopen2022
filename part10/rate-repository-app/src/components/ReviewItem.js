import {View} from 'react-native';
import Text from './Text.js';

const ReviewItem = ({ review }) => {
  return (
    <View key={review.id}>
      <Text>Rating: {review.rating}</Text>
      <Text>Review: {review.text}</Text>
      <Text>Created at: {review.createdAt}</Text>
      <Text>Username: {review.user.username}</Text>
    </View>
  )
}

export default ReviewItem;