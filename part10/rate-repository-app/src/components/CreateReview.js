import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useNavigate} from 'react-router-native';

import useCreateReview from '../hooks/useCreateReview.js';
import CreateReviewForm from './CreateReviewForm.js';
import Text from './Text.js';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    marginBottom: 10,
  }
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const data = await createReview({ repositoryName, ownerName, rating, text });
      if (data === null) {
        return;
      }

      navigate(`/${ownerName}.${repositoryName}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text fontWeight={'bold'} fontSize={'subheading'} style={styles.header}>Create a review</Text>
      <CreateReviewForm onSubmit={onSubmit} />
    </KeyboardAvoidingView>
  );
}

export default CreateReview;