import {Navigate} from 'react-router-native';
import {useAuthStorage} from '../hooks/useAuthStorage';
import {useApolloClient} from '@apollo/client';
import {useEffect} from 'react';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = async () => {
    if (!authStorage) {
      return;
    }

    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/sign-in"/>;
}

export default SignOut;