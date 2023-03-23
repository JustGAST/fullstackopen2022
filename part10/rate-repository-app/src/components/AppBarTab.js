import Text from './Text';
import {StyleSheet} from 'react-native';
import {Link} from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
})

const AppBarTab = ({text, to}) => {
  return (
    <Link style={styles.tab} to={to}>
      <Text fontSize={'subheading'} color={'light'} fontWeight={'bold'}>{text}</Text>
    </Link>
  )
}

export default AppBarTab;

