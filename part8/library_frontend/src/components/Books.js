import {useQuery} from '@apollo/client';
import {ALL_BOOKS} from '../queries';
import {useState} from 'react';

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

      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
            <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        </tbody>
      </table>

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
