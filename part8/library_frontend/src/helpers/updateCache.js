import {ALL_AUTHORS, ALL_BOOKS, ALL_GENRES} from '../queries';

export const updateCache = (cache, addedBook) => {
  const uniqueByKey = (items, key) => {
    let seen = new Set();
    return items.filter(item => {
      const current = item[key]
      return seen.has(current) ? false : seen.add(current)
    })
  }

  cache.updateQuery({query: ALL_BOOKS}, ({allBooks}) => {
    console.log(uniqueByKey(allBooks.concat(addedBook), 'title'));
    return ({
      allBooks: uniqueByKey(allBooks.concat(addedBook), 'title')
    });
  })

  cache.updateQuery({query: ALL_AUTHORS}, ({allAuthors}) => {
    console.log(uniqueByKey(allAuthors.concat(addedBook.author), 'name'));
    return {
      allAuthors: uniqueByKey(allAuthors.concat(addedBook.author), 'name')
    }
  });

  cache.updateQuery({query: ALL_GENRES}, ({allGenres}) => {
    return ({
      allGenres: allGenres.find(genre => addedBook.genres.includes(genre))
        ? allGenres
        : allGenres.concat(addedBook.genres)
    });
  });
}