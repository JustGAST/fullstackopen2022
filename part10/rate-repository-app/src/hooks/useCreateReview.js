import {useMutation} from '@apollo/client';
import {CREATE_REVIEW} from '../graphql/mutations.js';


const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({repositoryName, ownerName, rating, text}) => {
    const result = await mutate({
      variables: {repositoryName, ownerName, rating: Number(rating), text}
    });

    if (!(
      result
      && result.hasOwnProperty('data')
      && result.data.hasOwnProperty('createReview')
    )
    ) {
      return null;
    }

    return result.data.createReview;
  }

  return [createReview, result];
}

export default useCreateReview;