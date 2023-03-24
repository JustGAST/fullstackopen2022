import {Formik} from 'formik';
import {Pressable, StyleSheet, View} from 'react-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const initialValues = {
  login: '',
  password: '',
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  }
})

const SignInForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name={'login'} placeholder={'Login'} />
          <FormikTextInput name={'password'} placeholder={'Password'} secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text color={'light'}>Login</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default SignInForm;