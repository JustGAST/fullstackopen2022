import Text from './Text';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import SignInForm from './SignInForm';

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
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text fontWeight={'bold'} fontSize={'subheading'} style={styles.signInHeader}>Sign-in</Text>
      <SignInForm />
    </KeyboardAvoidingView>
  );
}

export default SignIn;