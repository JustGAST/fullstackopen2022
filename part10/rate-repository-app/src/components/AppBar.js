import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    marginBottom: 10,
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: theme.colors.barColor,
    flexDirection: "row",
    height: Platform.select({
      'android': 100,
      'ios': 110,
      'default': 110,
    }),
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' to={"/"} />
        <AppBarTab text='SignIn' to={"/sign-in"} />
      </ScrollView>
    </View>
  )
};

export default AppBar;