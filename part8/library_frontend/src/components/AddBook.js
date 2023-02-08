import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES} from '../queries';

const AddBook = (props) => {
  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, {data: addBookQueryResult}) => {
      cache.updateQuery({query: ALL_BOOKS}, ({allBooks}) => ({
        allBooks: allBooks.concat(addBookQueryResult.addBook)
      }));

      cache.updateQuery({query: ALL_AUTHORS}, ({allAuthors}) => ({
        allAuthors: allAuthors.concat(addBookQueryResult.addBook.author)
      }));

      cache.updateQuery({query: ALL_GENRES}, ({allGenres}) => ({
        allGenres: addBookQueryResult.genres && addBookQueryResult.genres.length > 0
          ? allGenres.concat(addBookQueryResult.genres)
          : allGenres
      }));
    }
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault();

    try {
      await addBook({
        variables: {
          title, author, published: Number(published), genres
        }
      });

      setTitle('');
      setPublished('');
      setAuthor('');
      setGenres([]);
      setGenre('');
    } catch (e) {
      console.log(e);
      props.setError(e.message);
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  const onGenreEnterPress = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (e.target.value === '') {
      return;
    }

    e.preventDefault();

    setGenre(e.target.value);
    addGenre();
  };

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({target}) => setGenre(target.value)}
            onKeyDown={onGenreEnterPress}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default AddBook;
