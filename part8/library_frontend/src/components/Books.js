import {useQuery} from '@apollo/client';
import {ALL_BOOKS, ALL_GENRES} from '../queries';
import BooksTable from './BooksTable';
import {useState} from 'react';

const Books = (props) => {
  const booksQueryResult = useQuery(ALL_BOOKS);
  const genresQueryResult = useQuery(ALL_GENRES);

  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!props.show) {
    return null;
  }

  if (booksQueryResult.loading || genresQueryResult.loading) {
    return <>Loading...</>;
  }

  const setGenre = (genre) => {
    setSelectedGenre(genre)
    booksQueryResult.refetch({
      genre
    })
  }

  let books = booksQueryResult.data.allBooks;
  const genres = genresQueryResult.data.allGenres;

  const setActiveButton = (condition) => ({fontWeight: condition ? 'bold' : 'normal'})

  return (
    <div>
      <h2>books</h2>

      <BooksTable books={books} />

      <div>
        {genres.map(genre => (
          <button
            key={genre}
            type={'button'}
            onClick={() => setGenre(genre)}
            style={setActiveButton(genre === selectedGenre)}
          >
            {genre}
          </button>
        ))}
        <button
          type={'button'}
          onClick={() => setGenre(null)}
          style={setActiveButton(selectedGenre === null)}
          >
          all genres
        </button>
      </div>
    </div>
  );
}

export default Books
