import {useApolloClient, useMutation} from '@apollo/client';
import {AUTHENTICATE} from '../graphql/mutations';
import {useAuthStorage} from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  /** @type {AuthStorage} **/
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({username, password}) => {
    const result = await mutate({
      variables: {username, password}
    });

    if (!(Object.hasOwn(result, 'data')
      && Object.hasOwn(result.data, 'authenticate'))) {
      return null;
    }

    await authStorage.setAccessToken(result.data.authenticate.accessToken)
    await apolloClient.resetStore();

    return result.data.authenticate;
  }

  return [signIn, result];
}

export default useSignIn;