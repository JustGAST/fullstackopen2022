import Text from './Text';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import SignInForm from './SignInForm';
import useSignIn from '../hooks/useSignIn';
import {useNavigate} from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  signInHeader: {
    marginBottom: 10,
  },
})

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({username, password}) => {
    try {
      const data = await signIn({username, password});
      if (data === null) {
        return;
      }

      navigate("/")
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text fontWeight={'bold'} fontSize={'subheading'} style={styles.signInHeader}>Sign-in</Text>
      <SignInForm onSubmit={onSubmit} />
    </KeyboardAvoidingView>
  );
}

export default SignIn;