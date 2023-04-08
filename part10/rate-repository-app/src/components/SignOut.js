import {Navigate} from 'react-router-native';
import {useAuthStorage} from '../hooks/useAuthStorage';
import {useApolloClient} from '@apollo/client';
import {useEffect} from 'react';

const SignOut = async () => {
  console.log('SignOut');

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  console.log('useAuthStorage');

  if (authStorage == null) {
    return <Navigate to='/sign-in' />;
  }

  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to='/sign-in' />;
}

export default SignOut;