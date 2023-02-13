import {useLazyQuery, useQuery} from '@apollo/client';
import {ALL_BOOKS, ME} from '../queries';
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
  }] = useLazyQuery(ALL_BOOKS);

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

  return <div>
    <h2>recommended books</h2>
    <BooksTable books={booksData?.allBooks}/>
  </div>;
};

export default RecommendedBooks;