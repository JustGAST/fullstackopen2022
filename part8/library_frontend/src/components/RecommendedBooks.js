import {useLazyQuery, useQuery} from '@apollo/client';
import {FAVORITE_GENRE_BOOKS, ME} from '../queries';
import BooksTable from './BooksTable';
import {useEffect} from 'react';

const RecommendedBooks = ({show}) => {
  const meQuery = useQuery(ME, {
    skip: !show
  });

  const [queryRecommendedBooks, {
    called: booksQueryCalled,
    loading: booksLoading,
    data: booksData
  }] = useLazyQuery(FAVORITE_GENRE_BOOKS);

  useEffect(() => {
    if (meQuery.data?.me?.favoriteGenre) {
      queryRecommendedBooks({
        variables: {genre: meQuery.data.me.favoriteGenre}
      });
    }
  }, [meQuery, queryRecommendedBooks]);

  if (!show) {
    return;
  }

  if (meQuery.loading || booksLoading || !booksQueryCalled) {
    return <>Loading...</>;
  }

  return <BooksTable books={booksData.allBooks}/>;
};

export default RecommendedBooks;