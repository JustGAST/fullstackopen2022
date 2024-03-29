import {Formik} from 'formik';
import {Pressable, View} from 'react-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import ui from '../ui.js';

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Login is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
});

const SignInForm = ({onSubmit}) => {
  const onSubmitForm = (values) => {
    onSubmit(values)
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name={'username'} placeholder={'Login'} />
          <FormikTextInput name={'password'} placeholder={'Password'} secureTextEntry />
          <Pressable onPress={handleSubmit} style={ui.button}>
            <Text color={'light'}>Login</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default SignInForm;