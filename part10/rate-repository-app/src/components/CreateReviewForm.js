import {Formik} from 'formik';
import * as yup from 'yup';
import {Pressable, View} from 'react-native';

import FormikTextInput from './FormikTextInput.js';
import Text from './Text.js';
import ui from '../ui.js';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  review: yup.string(),
})

const CreateReviewForm = ({onSubmit}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {({handleSubmit}) => (
        <View>
          <FormikTextInput name={'ownerName'} placeholder={'Repository owner name'}/>
          <FormikTextInput name={'repositoryName'} placeholder={'Repository name'}/>
          <FormikTextInput name={'rating'} placeholder={'Rating between 0 and 100'}/>
          <FormikTextInput name={'review'} placeholder={'Review'} multiline={true}/>
          <Pressable onPress={handleSubmit} style={ui.button}>
            <Text color={'light'}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default CreateReviewForm