import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';

import Text from './Text';
import theme from '../theme';
import Perk from './Perk';
import ui from '../ui.js';
import {useNavigate} from 'react-router-native';

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
  avatar: {
    width: 50,
    height: 50,
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

const RepositoryItem = ({repository, showLink}) => {
  const navigate = useNavigate();

  const onViewButtonPressed = () => {
    Linking.openURL(`https://github.com/${repository.fullName}`)
  }

  const onRepositoryPressed = () => {
    if (showLink) {
      return;
    }

    navigate(`/${repository.id}`);
  }

  return (
    <Pressable onPress={onRepositoryPressed}>
      <View style={styles.container} testID={"repositoryItem"}>
        <View style={styles.item}>
          <View style={styles.avatarColumn}>
            <Image style={styles.avatar} source={{uri: repository.ownerAvatarUrl}} testID={"repositoryItemAvatar"}/>
          </View>
          <View style={styles.infoColumn}>
            <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
            <Text style={styles.description} color={'textSecondary'}>{repository.description}</Text>
            <View style={styles.languageContainer}>
              <View style={styles.language}>
                <Text color={'light'}>{repository.language}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.perks}>
          <Perk value={repository.stargazersCount} name={'Stars'}/>
          <Perk value={repository.forksCount} name={'Forks'}/>
          <Perk value={repository.reviewCount} name={'Reviews'}/>
          <Perk value={repository.ratingAverage} name={'Rating'}/>
        </View>
        {showLink ? (
          <Pressable style={[ui.button, styles.button]} onPress={onViewButtonPressed}>
            <Text style={ui.buttonText} fontWeight={'bold'} color={'light'}>View on GitHub</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  )
}

export default RepositoryItem;