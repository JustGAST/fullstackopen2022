import {gql} from '@apollo/client';

export const FRAGMENT_REPOSITORY_FULL = gql`
  fragment RepositoryFullInfo on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
`