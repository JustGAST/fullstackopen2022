import {View, Image, StyleSheet} from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    backgroundColor: '#cecece',
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row"
  },
  avatar: {
    width: 50,
    height: 50,
  },
  avatarColumn: {
    width: 60,
  },
  infoColumn: {
    maxWidth: 310,
  }
})

const RepositoryItem = ({repository}) => {
  return (
    <View style={styles.item}>
      <View style={styles.avatarColumn}>
        <Image style={styles.avatar} source={{uri: repository.ownerAvatarUrl}} />
      </View>
      <View style={styles.infoColumn}>
        <Text fontWeight='bold' fontSize='subheading'>Full name: {repository.fullName}</Text>
        <Text>Description: {repository.description}</Text>
        <Text>Language: {repository.language}</Text>
        <Text>Stars: {repository.stargazersCount}</Text>
        <Text>Forks: {repository.forksCount}</Text>
        <Text>Reviews: {repository.reviewCount}</Text>
        <Text>Rating: {repository.ratingAverage}</Text>
      </View>
    </View>
  )
}

export default RepositoryItem;