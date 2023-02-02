const {ApolloServer, gql} = require('apollo-server');

const db = require('./db');
const Book = require('./models/Book');
const Author = require('./models/Author');

db.connect();

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
    }

    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books;

      if (args.author != null) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author);
      }

      if (args.genre != null) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
      }

      return filteredBooks;
    },
    allAuthors: () => authors.map(author => {
      author.bookCount = books.filter(book => book.author === author.name).length;
      return author;
    }),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author});

      if (author === null) {
        author = new Author({name: args.author});
        await author.save();
      }

      const newBook = new Book({...args, author});
      await newBook.save();
      await newBook.populate('author');

      return newBook;
    },
    editAuthor: (root, args) => {
      const editedAuthor = authors.find((author) => author.name === args.name)
      if (!editedAuthor) {
        return null;
      }

      editedAuthor.born = args.setBornTo;

      authors = authors.map(
        (author) => author.name === editedAuthor.name ? editedAuthor : author
      )

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