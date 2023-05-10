import {StyleSheet, View} from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import {Navigate, Route, Routes} from 'react-router-native';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RepositoryView from './RepositoryView.js';
import CreateReview from './CreateReview.js';

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
        <Route path={'/:id'} element={<RepositoryView />} exact />
        <Route path={'/create-review'} element={<CreateReview />} exact />
        <Route path={'/sign-in'} element={<SignIn />} exact />
        <Route path={'/sign-out'} element={<SignOut />} exact />
        <Route path={"*"} element={<Navigate to={"/"} replace />} />
      </Routes>
    </View>
  )
};

export default Main;