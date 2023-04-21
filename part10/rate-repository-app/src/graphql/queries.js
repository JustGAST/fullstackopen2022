import {gql} from '@apollo/client';
import {FRAGMENT_REPOSITORY_FULL} from './fragments.js';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryFullInfo
        }
      }
    }
  }
  
  ${FRAGMENT_REPOSITORY_FULL}
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFullInfo
    }
  } 
  
  ${FRAGMENT_REPOSITORY_FULL}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`