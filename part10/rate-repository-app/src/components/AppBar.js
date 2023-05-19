import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';
import {useQuery} from '@apollo/client';
import {ME} from '../graphql/queries';

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
  const meQuery = useQuery(ME)

  let signTab = <AppBarTab text='Sign In' to={"/sign-in"} />
  let createReviewTab = null;

  if (meQuery.data != null && meQuery.data.me != null) {
    signTab = <AppBarTab text='Sign Out' to={'/sign-out'} />
    createReviewTab = <AppBarTab text='Create a review' to={"/create-review"} />
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' to={"/"} />
        {createReviewTab}
        {signTab}
      </ScrollView>
    </View>
  );
};

export default AppBar;