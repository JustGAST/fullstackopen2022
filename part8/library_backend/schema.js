const gql = require('graphql-tag');

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
    
    type User {
        id: ID!
        username: String!
        favoriteGenre: String!
    }
    
    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        allGenres: [String!]!
        me: User
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
        createUser(username: String!, password: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
    
    type Subscription {
        bookAdded: Book!
    }
`

module.exports = typeDefs