const {ApolloServer, UserInputError, AuthenticationError} = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const Book = require('./models/Book');
const Author = require('./models/Author');
const {typeDefs} = require('./typeDefs')
const User = require('./models/User');

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

      return Book.find(filter).populate('author');
    },
    allAuthors: async () => Author.find({}),
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
    editAuthor: async (root, args, context) => {
      if (context.currentUser == null) {
        throw new AuthenticationError('not authenticated')
      }

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
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (user == null) {
        throw new UserInputError("No such user")
      }

      if (!bcrypt.compareSync(args.password, user.passwordHash)) {
        throw new UserInputError("Invalid password")
      }

      const token = jwt.sign({
        username: user.username,
        id: user._id,
      }, process.env.JWT_SECRET)

      return {
        value: token
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})