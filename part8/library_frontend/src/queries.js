import {gql} from '@apollo/client';

const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`;

const ALL_BOOKS = gql`
    query {
        allBooks {
            id
            author {
                id
                name
            }
            title
            published
            genres
        }
    }
`;

const ADD_BOOK = gql`
    mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            title
            author {
                id
                name
            }
        }
    }
`

const EDIT_AUTHOR = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export {ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR}