import {useMutation} from '@apollo/client';
import {AUTHENTICATE} from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({username, password}) => {
    const result = await mutate({
      variables: {username, password}
    });

    if (!(Object.hasOwn(result, 'data')
      && Object.hasOwn(result.data, 'authenticate'))) {
      return null;
    }

    return result.data.authenticate;
  }

  return [signIn, result];
}

export default useSignIn;