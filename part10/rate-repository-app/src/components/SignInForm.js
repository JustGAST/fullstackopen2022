import {Formik} from 'formik';
import {Pressable, StyleSheet, View} from 'react-native';
import * as yup from 'yup';

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
});

const validationSchema = yup.object().shape({
  login: yup
    .string()
    .required('Login is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
});

const SignInForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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