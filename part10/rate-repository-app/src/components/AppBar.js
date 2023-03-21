import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    marginBottom: 10,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.barColor,
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text='Repositories' onPress={() => console.log('press')} />
    </View>
  )
};

export default AppBar;