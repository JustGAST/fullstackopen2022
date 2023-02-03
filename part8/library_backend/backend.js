const {ApolloServer, UserInputError} = require('apollo-server');

const db = require('./db');
const Book = require('./models/Book');
const Author = require('./models/Author');
const {typeDefs} = require('./typeDefs')

db.connect();

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author != null) {
        const author = await Author.findOne({name: args.author})
        if (!author) {
          return [];
        }

        filter.author = author._id;
      }

      if (args.genre != null) {
        filter.genres = { $in: [args.genre]}
      }

      const books = await Book.find(filter).populate('author')

      console.log(filter, books);

      return books;
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author});

      if (author === null) {
        author = new Author({name: args.author});
        author.bookCount = 0;
      }

      try {
        author.bookCount = author.bookCount + 1;
        await author.save();

        const newBook = new Book({...args, author});
        await newBook.save();
        await newBook.populate('author');
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      return newBook;
    },
    editAuthor: async (root, args) => {
      const editedAuthor = await Author.findOne({name: args.name})
      if (!editedAuthor) {
        return null;
      }

      try {
        editedAuthor.born = args.setBornTo;
        await editedAuthor.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }

      return editedAuthor;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})