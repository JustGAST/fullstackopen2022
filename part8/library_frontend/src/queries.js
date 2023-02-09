import {gql} from '@apollo/client';

const FRAGMENT_AUTHOR_FULL = gql`
    fragment AuthorFullInfo on Author {
        id
        name
        born
        bookCount
    }
`

const FRAGMENT_BOOK_WITH_AUTHOR = gql`
    fragment BookWithAuthor on Book {
        id
        title
        author {
            ...AuthorFullInfo
        }
        published
        genres
    }
    
    ${FRAGMENT_AUTHOR_FULL}
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorFullInfo
        }

        ${FRAGMENT_AUTHOR_FULL}
    }
`;

export const ALL_BOOKS = gql`
    query ($genre: String) {
        allBooks(genre: $genre) {
            ...BookWithAuthor
        }
    }
    
    ${FRAGMENT_BOOK_WITH_AUTHOR}
`;

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const ME = gql`
    query {
        me {
            id
            username
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            ...BookWithAuthor
        }
    }
    
    ${FRAGMENT_BOOK_WITH_AUTHOR}
`

export const EDIT_AUTHOR = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`