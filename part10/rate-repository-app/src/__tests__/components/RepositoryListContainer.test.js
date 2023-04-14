import {render, screen} from '@testing-library/react-native';

import RepositoryListContainer from '../../components/RepositoryListContainer';

describe("RepositoryListContainer", () => {
  it('renders repository information correctly', () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />)

    const repositoryItems = screen.getAllByTestId('repositoryItem');
    const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

    expect(repositoryItems.length).toBe(2);

    expect(firstRepositoryItem).toBeDefined();
    expect(firstRepositoryItem).toContainElement(
      screen.getByText('jaredpalmer/formik')
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getByText('Build forms in React, without the tears')
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getByText('TypeScript')
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getByText('1.6k')
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getByText('21.9k')
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getByText('88')
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getAllByText('3')[0]
    );
    expect(firstRepositoryItem).toContainElement(
      screen.getAllByTestId('repositoryItemAvatar')[0]
    );
    expect(screen.getAllByTestId('repositoryItemAvatar')[0]).toHaveProp('source', {
      uri: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    })


    expect(secondRepositoryItem).toBeDefined();
    // expect(screen.getByTestId('repositoryItem')).toContain("Ivan Ivanov");
    // expect(screen.getByText('JavaScript')).toBeTruthy()
    // expect(screen.getByText('80')).toBeTruthy()
    // expect(screen.getByText('90')).toBeTruthy()
    // expect(screen.getByText('100')).toBeTruthy()
  })
})