import Text from './Text';
import {Pressable, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
})

const AppBarTab = ({text, onPress}) => {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text fontSize={'subheading'} color={'light'} fontWeight={'bold'}>{text}</Text>
    </Pressable>
  )
}

export default AppBarTab;

