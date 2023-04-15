import {render, screen} from '@testing-library/react-native';

import RepositoryListContainer from '../../components/RepositoryListContainer';
import {format} from '../../utils/perkValueFormatter';

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
    expect(secondRepositoryItem).toBeDefined();

    let i = 0;
    for (const {node} of repositories.edges) {
      expect(repositoryItems[i]).toContainElement(
        screen.getByText(node.fullName)
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getByText(node.description)
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getByText(node.language)
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getByText(String(format(node.forksCount)))
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getByText(String(format(node.stargazersCount)))
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getByText(String(format(node.ratingAverage)))
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getAllByText(String(format(node.reviewCount)))[i]
      );
      expect(repositoryItems[i]).toContainElement(
        screen.getAllByTestId('repositoryItemAvatar')[i]
      );
      expect(screen.getAllByTestId('repositoryItemAvatar')[i]).toHaveProp('source', {
        uri: node.ownerAvatarUrl,
      });

      i++;
    }
  })
})