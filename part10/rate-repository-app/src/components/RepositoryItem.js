import {View, Text, Image, StyleSheet} from 'react-native';

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
    flex: 1,
  },
  infoColumn: {
    flex: 5
  }
})

const RepositoryItem = ({repository}) => {
  return (
    <View style={styles.item}>
      <View style={styles.avatarColumn}>
        <Image style={styles.avatar} source={{uri: repository.ownerAvatarUrl}} />
      </View>
      <View style={styles.infoColumn}>
        <Text>Full name: {repository.fullName}</Text>
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