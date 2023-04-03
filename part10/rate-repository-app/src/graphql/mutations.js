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