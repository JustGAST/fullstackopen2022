const {GraphQLError} = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions')

const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');

const pubsub = new PubSub();

const BOOK_ADDED_EVENT = 'BOOK_ADDED';

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

      return Book.find(filter).populate('author');
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({})

      return [...new Set(books.map(book => book.genres).flat().filter(Boolean))].sort()
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (context.currentUser == null) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({name: args.author});

      if (author === null) {
        author = new Author({name: args.author});
        author.bookCount = 0;
        await author.save();
      }

      try {
        const newBook = new Book({...args, author});
        await newBook.save();
        await newBook.populate('author');

        author.bookCount = author.bookCount + 1;
        await author.save();

        pubsub.publish(BOOK_ADDED_EVENT, {bookAdded: newBook})

        return newBook;
      } catch (e) {
        throw new GraphQLError('adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: e
          }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (context.currentUser == null) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const editedAuthor = await Author.findOne({name: args.name})
      if (!editedAuthor) {
        return null;
      }

      try {
        editedAuthor.born = args.setBornTo;
        await editedAuthor.save()
      } catch (e) {
        throw new GraphQLError('edit author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: e
          }
        })
      }

      return editedAuthor;
    },
    createUser: async (root, args) => {
      try {
        const passwordHash = await bcrypt.hash(args.password, 10)

        const user = new User({
          username: args.username,
          passwordHash,
          favoriteGenre: args.favoriteGenre,
        })

        await user.save()

        return user
      } catch (e) {
        throw new GraphQLError('creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: e
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (user == null) {
        throw new GraphQLError('no such user', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (!bcrypt.compareSync(args.password, user.passwordHash)) {
        throw new GraphQLError('invalid password', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const token = jwt.sign({
        username: user.username,
        id: user._id,
      }, process.env.JWT_SECRET)

      return {
        value: token
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(BOOK_ADDED_EVENT)
    }
  }
}

module.exports = resolvers