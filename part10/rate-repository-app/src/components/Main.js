import {View, StyleSheet} from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import {Navigate, Route, Routes} from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path={'/'} element={<RepositoryList />} exact />
        <Route path={'/sign-in'} element={<SignIn />} exact />
        <Route path={"*"} element={<Navigate to={"/"} replace />} />
      </Routes>
    </View>
  )
};

export default Main;