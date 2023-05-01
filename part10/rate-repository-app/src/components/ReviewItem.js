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
  sideColumn: {
    width: 60,
  },
  infoColumn: {
    maxWidth: 310,
  },
  textMargin: {
    marginBottom: 5,
  }
});


const ReviewItem = ({ review }) => {
  const reviewDate = (new Date(review.createdAt)).toLocaleDateString('de-DE', {
    year: 'numeric', month: '2-digit', day: 'numeric'
  });

  return (
    <View key={review.id} style={[styles.container, styles.item]}>
      <View style={styles.sideColumn}>
        <View style={styles.rating}>
          <Text
            color={"primary"}
            fontSize={"subheading"}
            fontWeight={"bold"}
          >
            {review.rating}
          </Text>
        </View>
      </View>
      <View style={styles.infoColumn}>
        <Text fontWeight={'bold'} style={styles.textMargin}>{review.user.username}</Text>
        <Text color={'textSecondary'} style={styles.textMargin}>{reviewDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem;