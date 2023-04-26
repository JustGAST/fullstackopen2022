import {StyleSheet, View} from 'react-native';
import Text from './Text.js';
import theme from '../theme.js';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#cecece',
    marginHorizontal: 10,
    padding: 10,
  },
  item: {
    flexDirection: "row"
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarColumn: {
    width: 60,
  },
  infoColumn: {
    maxWidth: 310,
  },
  description: {
    marginVertical: 10,
  },
  languageContainer: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
  },
  perks: {
    flexDirection: "row",
    marginTop: 10
  },
  button: {
    marginTop: 10
  }
});


const ReviewItem = ({ review }) => {
  return (
    <View key={review.id} style={[styles.container, styles.item]}>
      <View style={styles.avatarColumn}>
        <View style={styles.rating}>
          <Text>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.infoColumn}>
        <Text>Review: {review.text}</Text>
        <Text>Created at: {review.createdAt}</Text>
        <Text>Username: {review.user.username}</Text>
      </View>
    </View>
  )
}

export default ReviewItem;