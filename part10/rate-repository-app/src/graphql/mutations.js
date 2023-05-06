import {gql} from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation ($username: String!, $password: String!) {
      authenticate (credentials: {username: $username, password: $password}) {
          user {
              id
              username
          }
          accessToken
          expiresAt
      }
  }
`;

export const CREATE_REVIEW = gql`
  mutation ($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
      createReview (review: {repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text}) {
          repositoryId
      }
  }
`;
