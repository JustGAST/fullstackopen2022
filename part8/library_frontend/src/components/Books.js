import {useQuery} from '@apollo/client';
import {ALL_BOOKS} from '../queries';
import {useState} from 'react';
import BooksTable from './BooksTable';

const Books = (props) => {
  const booksQueryResult = useQuery(ALL_BOOKS);
  const [genreFilter, setGenreFilter] = useState(null);

  if (!props.show) {
    return null;
  }

  if (booksQueryResult.loading) {
    return <>Loading...</>;
  }

  let {allBooks: books} = booksQueryResult.data;

  const genres = [...new Set(books.map(book => book.genres).flat())].sort();
  if (genreFilter !== null) {
    books = books.filter(book => book.genres.includes(genreFilter));
  }

  return (
    <div>
      <h2>books</h2>

      <BooksTable books={books} />

      <div>
        {genres.map(genre => (
          <button
            key={genre}
            type={'button'}
            onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button
          type={'button'}
          onClick={() => setGenreFilter(null)}
          >
          all genres
        </button>
      </div>
    </div>
  );
}

export default Books
